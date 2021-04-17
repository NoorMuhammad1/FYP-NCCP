const express = require("express");
const router = express.Router();
const Deposit = require("../models/deposit");
const User = require("../models/user");
const Microorganism = require("../models/microorganisms");
const { uploadFile, unpackFormRequest } = require("../common-used");

exports.CreateDeposit = async (req, res) => {
  const { userid, items, description } = req.body;
  const _desposit = new Deposit({
    userid,
    items,
    description,
  });
  _desposit.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (data) {
      return res.status(200).json({
        data,
      });
    }
  });
};

exports.getDepositList = (req, res) => {
  const condition = req.retrieve_all ? {} : { _id: req.user._id };
  Deposit.find(condition, "_id status createdAt", (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error",
      });
    }
    if (data) {
      return res.status(200).json(data);
    }
  });
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
  Deposit.findById(deposit_id, (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error fetching the order details",
      });
    }
    if (data) {
      const { status, _id, userid, createdAt } = data;
      var response = {
        _id,
        userid,
        createdAt,
        status,
      };
      if (req.retrieve_all) {
        switch (status) {
          case "Deposit Request":
            response.data = {
              items: data.items,
              description: data.description,
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
          case "Payment":
            break;
          case "Processing":
            response.data = { message: "The deposit is in processing" };
            break;
          case "Ready to Recieve":
            response.data = { message: "Please send us the samples" };
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
          case "Document Submission":
            response.data = {
              sample_documents: [
                "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135965/documents/Scope_Template_Updated_gsxdar.docx",
                "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135932/documents/Scope_Document_Template_BSCS_vhwxwf.docx",
              ],
              submitted_documents: data.documents,
            };

            break;
          case "Payment":
            break;
          case "Processing":
            response.data = {
              message:
                "Your deposit is being processed it will take some time so wait",
            };
            break;
          case "Ready to recieve":
            response.data = {
              message: "We are waiting for your deposit samples to reach us",
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
  const { files } = req;
  const { deposit_id } = req.body;
  const documents = await Promise.all(
    files.map(async (file) => {
      const file_data = await uploadFile(file, "deposit_documents");
      return {
        title: file_data.original_filename,
        document: file_data.url,
        approved: false,
        date: file_data.created_at,
      };
    })
  );
  Deposit.findByIdAndUpdate(deposit_id, { documents }, (error, response) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error while uploading the documents",
        error,
      });
    }
    if (response) {
      return res.status(200).json({
        message: "Documents submitted successfully",
      });
    }
  });
};

exports.ChangeDepositStatus = async (req, res) => {
  const { deposit_id } = req.body;
  const deposit = await Deposit.findById(deposit_id).exec();
  let current_status = deposit.status;
  const current_status_index = this.DepositStatus.findIndex(
    (status) => status === deposit.status
  );
  if (current_status_index > -1) {
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
      if (order.tracking === null || order.tracking.length === 0) {
        return res.status(400).json({
          message: "No tracking number has been added for this package",
        });
      }
    }
    current_status = this.OrderStatus[current_status_index + 1];
    Order.findByIdAndUpdate(
      order_id,
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
      message: "The order has been either cancelled or rejected before",
    });
  }
};

exports.OrderStatus = [
  "Order Request",
  "Document Submission",
  "Payment",
  "Processing",
  "Dispatched",
  "Delivered",
];

exports.SubmitTrackingNumber = async (req, res) => {
  const { order_id, tracking_number } = req.body;

  await Order.findOneAndUpdate(
    { _id: order_id, status: "Dispatched" },
    { tracking: tracking_number === undefined ? "" : tracking_number },
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
            "Either the order does not exist and is not ready for dispatch",
        });
      }
    }
  );
};

exports.ChangeOrderDocumentStatus = async (req, res) => {
  const { order_id, document_id, approved, description } = req.body;
  await Order.updateOne(
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
