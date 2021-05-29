const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const Microorganism = require("../models/microorganisms");
const { uploadFile, unpackFormRequest } = require("../common-used");
const order = require("../models/order");
const user = require("../models/user");
const { sample_order_files } = require("./files");
const prices = require("../models/prices");
exports.CreateOrder = async (req, res) => {
  const items = req.body.data;
  const userid = req.user._id;
  const _order = new Order({
    userid,
    items,
  });
  _order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        message: "Ther was some error creating the order",
        error,
      });
    }
    if (data)
      return res.status(200).json({
        message: "order created successfully",
      });
  });
};

exports.getOrderList = (req, res) => {
  const condition = req.retrieve_all ? {} : { userid: req.user._id };
  Order.find(condition, "_id status createdAt userid", async (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error",
      });
    }
    if (data) {
      data = await Promise.all(
        data.map(async (one_order) => {
          console.log(one_order.userid);
          const user_data = await user.findById(
            one_order.userid,
            "firstname lastname"
          );
          return {
            order_id: one_order._id,
            customer: user_data
              ? `${user_data.firstname} ${user_data.lastname}`
              : "user is not in the system anymore",
            date: one_order.createdAt,
            status: one_order.status,
          };
        })
      );
      return res.status(200).json(data);
    }
  });
};

exports.checkUserType = (req, res, next) => {
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
        if (permissions.view_O_Permission) {
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

exports.RejectOrder = async (req, res) => {
  const { order_id, description } = req.body;
  if (req.retrieve_all) {
    order.findByIdAndUpdate(
      order_id,
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
            message: "The order has been successfully rejected",
          });
        }
      }
    );
  } else {
    return res.status(400).json({
      message: "You do not have the necessary permission to reject this order",
    });
  }
};

exports.OrderDetails = async (req, res) => {
  const { order_id } = req.body;
  Order.findById(order_id, async (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error fetching the order details",
      });
    }
    if (data) {
      const { status, _id, userid, createdAt } = data;
      const order_user = await user.findById(userid, "firstname lastname");
      var response = {
        order_id: _id,
        user_id: userid,
        username: `${order_user.firstname} ${order_user.lastname}`,
        date: new Date(createdAt).toLocaleDateString(),
        status,
      };
      if (req.retrieve_all) {
        switch (status) {
          case "Order Request":
            let ordered_items = await Promise.all(
              data.items.map(async (item, index) => {
                let micro = await Microorganism.findById(
                  item.microorganism_id,
                  "CoreDataSets.Genus CoreDataSets.SpeciesEpithet"
                );
                return {
                  genus: micro.CoreDataSets.Genus,
                  speciesEpithet: micro.CoreDataSets.SpeciesEpithet,
                  quantity: item.quantity,
                };
              })
            );
            response.data = {
              items: ordered_items,
              description: data.description,
            };
            break;
          case "Rejected":
            // const reject_history_object = data.status_history.find(
            //   (element) => element.status === status
            // );
            response.data = {
              // date: reject_history_object.data,
              description: data.description || "no description given",
            };
            break;
          case "Order Cancelled":
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
            const { items } = data;
            let total = 0;
            const itemsInformation = await Promise.all(
              items.map(async (item) => {
                const data = await Microorganism.findById(
                  item.microorganism_id,
                  "price"
                ).exec();
                const { price } = data._doc;
                const sub_total = price * item.quantity;
                total += sub_total;
                return {
                  ...item._doc,
                  sub_total,
                };
              })
            );
            response.data = {
              items: itemsInformation,
              total,
            };
            break;
          case "Processing":
            response.data = { message: "The order is in processing" };
            break;
          case "Dispatched":
            console.log("hi");
            response.data = { tracking: data.tracking };
            break;
          case "Delivered":
            response.data = {
              message: "Order has been delivered",
              feedback: data.feedback,
            };
            break;
        }
      } else {
        switch (status) {
          case "Order Request":
            console.log("came to request orderr");
            response.message = "Your request is waiting to be approved";
            break;
          case "Rejected":
            // const reject_history_object = data.status_history.find(
            //   (element) => element.status === status
            // );
            response.data = {
              // date: reject_history_object.date,
              description: data.description || "no description given",
            };
            break;
          case "Order Cancelled":
            const cancel_history_object = data.status_history.find(
              (element) => element.status === status
            );
            response.data = {
              date: cancel_history_object.data,
              description: cancel_history_object.description,
            };
            break;
          case "Document Submission":
            const documents = (
              await sampleDocuments.findById(process.env.SAMPLE_DOCUMENT_ID)
            )._doc;
            response.data = {
              sample_documents: [...documents.order],
              submitted_documents: data.documents,
            };
            break;
          case "Payment":
            const { items } = data;
            let total = 0;
            let price = 0;
            const order_prices = (
              await prices.findById(process.env.PRICES_DOCUMENT_ID)
            )._doc;
            price = order_prices.order;
            const payment_data = await Promise.all(
              items.map(async (item) => {
                const { CoreDataSets } = (
                  await Microorganism.findById(
                    item.microorganism_id,
                    "CoreDataSets.Genus CoreDataSets.SpeciesEpithet price"
                  )
                )._doc;
                total += item.quantity * price;
                return {
                  microorganism_name: `${CoreDataSets.Genus} ${CoreDataSets.SpeciesEpithet}`,
                  quantity: item.quantity,
                  price,
                  sub_total: item.quantity * price,
                };
              })
            );
            response.data = { items: payment_data, total };
            break;
          case "Processing":
            response.data = {
              message:
                "Your order is being processed it will take some time so wait",
            };
            break;
          case "Dispatched":
            response.data = { tracking: data.tracking };
            break;

          case "Delivered":
            response.data = {
              message: "Your order has been delivered successfully",
            };
          // feedback=order.status_history.find((entry)=>entry.status==="Delivered")
        }
      }
      return res.status(200).json(response);
    }
  });
};

exports.SubmitOrderDocuments = async (req, res) => {
  const file = req.files[0];
  const { order_id, document_id } = req.body;
  let { documents } = await Order.findById(order_id, "documents");
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
  Order.findByIdAndUpdate(order_id, { documents }, (error, data) => {
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

exports.SubmitDocuments = async (req, res) => {
  const { files } = req;
  const { order_id } = req.body;
  const documents = await Promise.all(
    files.map(async (file) => {
      const file_data = await uploadFile(file, "documents");
      return {
        title: file_data.original_filename,
        document: file_data.url,
        approved: null,
        date: file_data.created_at,
      };
    })
  );
  Order.findByIdAndUpdate(order_id, { documents }, (error, response) => {
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

exports.ChangeOrderStatus = async (req, res) => {
  const { order_id } = req.body;
  const order = await Order.findById(order_id).exec();
  let current_status = order.status;

  const current_status_index = this.OrderStatus.findIndex(
    (status) => status === order.status
  );
  if (current_status_index > -1) {
    if (current_status === "Order Request") {
      console.log("order request being updated");
      console.log(sample_order_files);
      await Order.findByIdAndUpdate(
        order_id,
        {
          documents: sample_order_files,
        }
        // (error, data) => {
        //   if (error) console.log(error);
        //   if (data) console.log("doone");
        // }
      );
    }
    if (current_status === "Document Submission") {
      // checking if both documents are uploaded before moving on to the next step

      console.log("came to the document submission portion");
      // console.log(order.documents.length);
      if (order.documents === null || order.documents.length < 2) {
        return res.status(400).json({
          message:
            "All the necessary documents for the order have not been submitted yet",
        });
      }
      // checking if any document has not been approved yet
      if (order.documents.some((doc) => doc.approved === false)) {
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
    // if (direction && direction.toLowerCase() === "forward") {
    //   current_status = this.OrderStatus[current_status_index + 1];
    // }
    // if (direction && direction.toLowerCase() === "backward") {
    //   current_status = this.OrderStatus[current_status_index + 1];
    // }
    current_status = this.OrderStatus[current_status_index + 1];
    Order.findByIdAndUpdate(
      order_id,
      { status: current_status },
      (error, data) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            message: "There was some error while changing the status of order",
          });
        }
        if (data) {
          console.log("order status updated");
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

exports.ApproveOrderDocument = async (req, res) => {
  const { order_id, document_id } = req.body;
  let { documents } = await order.findById(order_id, "documents");
  documents = documents.map((doc) => {
    if (doc._id == document_id) {
      doc.approved = "Approved";
    }
    return doc;
  });
  const check = documents.every(
    (doc) => doc.approved.toLowerCase() == "approved"
  );
  await Order.findByIdAndUpdate(
    order_id,
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
exports.RejectOrderDocument = async (req, res) => {
  const { order_id, document_id, description } = req.body;
  let { documents } = await order.findById(order_id, "documents");
  documents = documents.map((doc) => {
    if (doc._id == document_id) {
      doc.approved = "Rejected";
      doc.description = description;
    }
    return doc;
  });
  await Order.findByIdAndUpdate(order_id, { documents }, (error, data) => {
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

exports.FowardOrderRequestStatus = async (req, res) => {
  const { order_id } = req.body;
  const order_to_forward = await order.findById(order_id);
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
    { _id: order_id },
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

exports.deleteOrder = async (req, res) => {
  const { ordersToDelete } = req.body;
  await Order.deleteMany({ _id: ordersToDelete }, (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error deleteing the orders",
        error,
      });
    }
    if (data) {
      return res.status(200).json({
        message: "Orders delete successfully",
      });
    }
  });
};
