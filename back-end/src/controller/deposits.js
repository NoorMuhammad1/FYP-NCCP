const express = require("express");
const router = express.Router();
const Deposit = require("../models/deposit");
const User = require("../models/user");
const Microorganism = require("../models/microorganisms");
const { uploadFile, unpackFormRequest } = require("../common-used");
const user = require("../models/user");
const deposit = require("../models/deposit");
const { sample_order_files } = require("./files");
const { depositPayment } = require("./payments");
const sampleDocuments = require("../models/sampleDocuments");
const prices = require("../models/prices");

exports.CreateDeposit = async (req, res) => {
  console.log("hi");
  const { items, type } = req.body;
  const userid = req.user._id;
  const _desposit = new Deposit({
    userid,
    items,
    type,
  });
  _desposit.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Ther was some error creating the deposit",
        error,
      });
    }
    if (data) {
      return res.status(200).json({
        message: "deposit created successfully",
      });
    }
  });
};

exports.getDepositList = (req, res) => {
  // const condition = req.retrieve_all ? {} : { _id: req.user._id };
  // Deposit.find(condition, "_id status createdAt", (error, data) => {
  //   if (error) {
  //     return res.status(400).json({
  //       message: "There was some error",
  //     });
  //   }
  //   if (data) {
  //     return res.status(200).json(data);
  //   }
  // });

  const condition = req.retrieve_all ? {} : { userid: req.user._id };
  Deposit.find(
    condition,
    "_id status type createdAt userid",
    async (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was some error",
        });
      }
      if (data) {
        data = await Promise.all(
          data.map(async (one_deposit) => {
            const user_data = await user.findById(
              one_deposit.userid,
              "firstname lastname"
            );
            return {
              deposit_id: one_deposit._id,
              customer: `${user_data.firstname} ${user_data.lastname}`,
              type: one_deposit.type,
              date: one_deposit.createdAt,
              status: one_deposit.status,
            };
          })
        );
        return res.status(200).json(data);
      }
    }
  );
};

exports.checkDepositUserType = (req, res, next) => {
  const user_id = req.user._id;
  User.findById(user_id, "role permissions", (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error finding user",
      });
    }
    if (data) {
      const { role, permissions } = data;
      if (role === "admin") {
        req.retrieve_all = true;
        next();
      } else if (role === "external") {
        req.retrieve_all = false;
        next();
      } else {
        if (permissions.view_D_Permission) {
          req.retrieve_all = true;
          next();
        } else {
          return res.status(400).json({
            message:
              "Requesting user does not have the permission to view the orders",
          });
        }
      }
    }
  });
};

exports.DepositDetails = async (req, res) => {
  const { deposit_id } = req.body;
  Deposit.findById(deposit_id, async (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error fetching the order details",
      });
    }
    if (data) {
      const { status, _id, userid, createdAt, type } = data;
      const deposit_user = await user.findById(userid, "firstname lastname");
      var response = {
        deposit_id: _id,
        user_id: userid,
        username: `${deposit_user.firstname} ${deposit_user.lastname}`,
        date: createdAt,
        status,
      };
      if (req.retrieve_all) {
        switch (status) {
          case "Deposit Request":
            response.data = {
              items: data.items,
            };
            break;
          case "Deposit Rejected":
            const reject_history_object = data.status_history.find(
              (element) => element.status === status
            );
            response.data = {
              date: reject_history_object.data,
              description: reject_history_object.description,
            };
            break;
          case "Deposit Cancelled":
            const cancel_history_object = data.status_history.find(
              (element) => element.status === status
            );
            response.data = {
              date: cancel_history_object.data,
              description: cancel_history_object.description,
            };
            break;
          case "Document Submission":
            response.data = {
              submitted_documents: data.documents,
            };
            break;
          case "Rejected":
            response.data = {
              description: data.description,
            };
          case "Payment":
            break;
          case "Processing":
            response.data = { message: "The deposit is in processing" };
            break;
          case "Dispatched":
            response.data = {
              message: "This order is dispatched",
              tracking: data.tracking,
            };
            break;
          case "Deposited":
            response.data = {
              message: "The samples have been deposited",
            };
            break;
        }
      } else {
        switch (status) {
          case "Deposit Request":
            console.log("came to request deposit");
            response.message = "Your request is waiting to be approved";
            break;
          case "Deposit Rejected":
            const reject_history_object = data.status_history.find(
              (element) => element.status === status
            );
            response.data = {
              date: reject_history_object.data,
              description: reject_history_object.description,
            };
            break;
          case "Deposit Cancelled":
            const cancel_history_object = data.status_history.find(
              (element) => element.status === status
            );
            response.data = {
              date: cancel_history_object.data,
              description: cancel_history_object.description,
            };
            break;
          case "Awaiting Dispatch":
            if (data.rejected) {
              response.data = {
                rejected: data.rejected,
                description: data.description,
              };
            }
            break;
          case "Document Submission":
            // const type = data.type;
            const documents = (
              await sampleDocuments.findById(process.env.SAMPLE_DOCUMENT_ID)
            )._doc;
            response.data = {
              sample_documents: [
                ...((
                  type === "General Deposit"
                    ? documents.general_deposit
                    : type === "Patent Deposit"
                )
                  ? documents.patent_deposit
                  : type === "Safe Deposit"
                  ? documents.safe_deposit
                  : undefined),
              ],
              submitted_documents: data.documents,
            };

            break;
          case "Rejected":
            console.log("rejecting");
            response.data = {
              description: data.description,
            };
            break;
          case "Payment":
            const { items } = data;
            let total = 0;
            let price = 0;
            const deposit_prices = (
              await prices.findById(process.env.PRICES_DOCUMENT_ID)
            )._doc;
            if (type === "General Deposit") {
              price = deposit_prices.general_deposit;
            } else if (type === "Safe Deposit") {
              price = deposit_prices.safe_deposit;
            } else {
              price = deposit_prices.patent_deposit;
            }
            const payment_data = await Promise.all(
              items.map(async (item) => {
                total += item.quantity * price;
                return {
                  microorganism_name: `${item.genus} ${item.species}`,
                  quantity: item.quantity,
                  price,
                  sub_total: item.quantity * price,
                };
              })
            );
            await deposit.findByIdAndUpdate(_id, { total });
            response.data = { items: payment_data, total, type: data.type };
            break;
          case "Processing":
            response.data = {
              message:
                "Your deposit is being processed it will take some time so wait",
            };
            break;
          case "Dispatched":
            response.data = {
              message: "This deposit has been dispatched.",
              tracking: data.tracking,
            };
            break;

          case "Deposited":
            response.data.message =
              "Your samples have been depositted successfully";
          // feedback=order.status_history.find((entry)=>entry.status==="Delivered")
        }
      }
      return res.status(200).json(response);
    }
  });
};

exports.SubmitDepositDocuments = async (req, res) => {
  const file = req.files[0];
  const { deposit_id, document_id } = req.body;
  console.log(deposit_id);
  let { documents } = (await Deposit.findById(deposit_id, "documents"))._doc;
  // documents = await documents.documents;
  documents = await Promise.all(
    documents.map(async (doc) => {
      if (doc._id == document_id) {
        const file_data = await uploadFile(file, "documents");
        return {
          ...doc._doc,
          document: file_data.url,
          approved: "Awaiting Approval",
          date: file_data.created_at,
        };
      }
      return doc;
    })
  );
  Deposit.findByIdAndUpdate(deposit_id, { documents }, (error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "There was some error submitting the file",
      });
    }
    if (data) {
      console.log("file upploaded successfully");
      return res.status(200).json({
        message: "File submitted successfully",
      });
    }
  });
};

exports.ApproveDepositDocument = async (req, res) => {
  const { deposit_id, document_id } = req.body;
  let { documents } = await Deposit.findById(deposit_id, "documents");
  documents = documents.map((doc) => {
    if (doc._id == document_id) {
      doc.approved = "Approved";
    }
    return doc;
  });
  const check = documents.every(
    (doc) => doc.approved.toLowerCase() == "approved"
  );
  await Deposit.findByIdAndUpdate(
    deposit_id,
    { documents, ...(check ? { status: "Payment" } : null) },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was some error",
        });
      }
      if (data) {
        // console.log(data);
        return res.status(200).json({
          message: "The document was approved successfully",
        });
      }
    }
  );
};
exports.RejectDepositDocument = async (req, res) => {
  const { deposit_id, document_id, description } = req.body;
  let { documents } = await Deposit.findById(deposit_id, "documents");
  documents = documents.map((doc) => {
    if (doc._id == document_id) {
      doc.approved = "Rejected";
      doc.description = description;
    }
    return doc;
  });
  await Deposit.findByIdAndUpdate(deposit_id, { documents }, (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error",
      });
    }
    if (data) {
      console.log(res);
      return res.status(200).json({
        message: "The document was rejected successfully",
      });
    }
  });
};

exports.SubmitDepositTrackingNumber = async (req, res) => {
  const { deposit_id, tracking_number } = req.body;

  await Deposit.findOneAndUpdate(
    { _id: deposit_id },
    {
      tracking: tracking_number === undefined ? "" : tracking_number,
      status: "Dispatched",
    },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was some error updating the requested document",
        });
      }
      if (data) {
        return res.status(200).json({
          message: "The tracking number has been updated successfully",
        });
      } else {
        return res.status(400).json({
          message:
            "Either the deposit does not exist and is not ready for dispatch",
        });
      }
    }
  );
};

exports.RejectDeposit = async (req, res) => {
  const { deposit_id, description } = req.body;
  if (req.retrieve_all) {
    deposit.findByIdAndUpdate(
      deposit_id,
      { status: "Rejected", description },
      (error, data) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            message: "there was some error",
          });
        }
        if (data) {
          return res.status(200).json({
            message: "The deposit has been successfully rejected",
          });
        }
      }
    );
  } else {
    return res.status(400).json({
      message:
        "You do not have the necessary permission to reject this deposit",
    });
  }
};

exports.rejectDepositItems = (req, res) => {
  const { deposit_id, description } = req.body;
  Deposit.findByIdAndUpdate(
    deposit_id,
    { status: "Awaiting Dispatch", rejected: true, description },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "THere was some error rejecting the deposit items",
        });
      }
      if (data) {
        return res.status(200).json({
          message: "Deposit has been rejected successfully",
        });
      }
    }
  );
};

exports.ChangeDepositStatus = async (req, res) => {
  const { deposit_id } = req.body;
  const deposit = await Deposit.findById(deposit_id).exec();
  let current_status = deposit.status;
  const current_status_index = this.DepositStatus.findIndex(
    (status) => status === deposit.status
  );
  if (current_status_index > -1) {
    if (current_status === "Deposit Request") {
      console.log("deposit request being updated");
      await Deposit.findByIdAndUpdate(deposit_id, {
        documents: sample_order_files,
      });
    }
    if (current_status === "Document Submission") {
      // checking if both documents are uploaded before moving on to the next step

      console.log("came to the document submission portion");
      // console.log(order.documents.length);
      if (deposit.documents === null || deposit.documents.length < 2) {
        return res.status(400).json({
          message:
            "All the necessary documents for the deposit have not been submitted yet",
        });
      }
      // checking if any document has not been approved yet
      if (deposit.documents.some((doc) => doc.approved === false)) {
        return res.status(400).json({
          message: "Some submitted document have not been approved yet",
        });
      }
    }
    if (current_status === "Payment") {
      // checking payment conditions
    }
    if (current_status === "Dispatched") {
      // checking if a tracking number has been entered for the order
      if (deposit.tracking === null || deposit.tracking.length === 0) {
        return res.status(400).json({
          message: "No tracking number has been added for this package",
        });
      }
    }
    current_status = this.DepositStatus[current_status_index + 1];
    Deposit.findByIdAndUpdate(
      deposit_id,
      { status: current_status },
      (error, data) => {
        if (error) {
          return res.status(400).json({
            message: "There was some error while changing the status of order",
          });
        }
        if (data) {
          return res.status(200).json({
            message: "Status has been updated Successfully",
          });
        }
      }
    );
  } else {
    return res.status(400).json({
      message: "The deposit has been either cancelled or rejected before",
    });
  }
};

exports.DepositStatus = [
  "Deposit Request",
  "Document Submission",
  "Payment",
  "Awaiting Dispatch",
  "Dispatched",
  "Processing",
  "Deposited",
];

exports.ChangeDepositDocumentStatus = async (req, res) => {
  const { deposit_id, document_id, approved, description } = req.body;
  await Deposit.updateOne(
    {
      documents: { $elemMatch: { _id: document_id } },
    },
    {
      $set: {
        "documents.$.approved": approved === undefined ? false : approved,
        "documents.$.description": description === undefined ? "" : description,
      },
    },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      if (data) {
        if (data.n >= 1) {
          return res.status(200).json({
            message: "Document status updated successfully",
          });
        } else {
          return res.status(400).json({
            message: "No such document of the same document id was found",
          });
        }
      }
    }
  );
};

exports.deleteDeposit = async (req, res) => {
  const { depositsToDelete } = req.body;
  const response = await Deposit.deleteMany(
    { _id: depositsToDelete },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was some error deleteing the deposits",
          error,
        });
      }
      if (data) {
        return res.status(200).json({
          message: "Deposits delete successfully",
        });
      }
    }
  );
};
