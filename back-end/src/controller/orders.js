const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const Microorganism = require("../models/microorganisms");
const { uploadFile, unpackFormRequest } = require("../common-used");
const order = require("../models/order");
exports.CreateOrder = async (req, res) => {
  const { userid, items, total } = req.body;
  // user_id = await User.findOne({}, "_id").exec();
  // m_id = await Microorganism.findOne({}, "_id").exec();
  const _order = new Order({
    userid,
    items,
    total,
  });
  _order.save((error, data) => {
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

exports.getOrderList = (req, res) => {
  const condition = req.retrieve_all ? {} : { _id: req.user._id };
  Order.find(condition, "_id status createdAt", (error, data) => {
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
      var response = {
        _id,
        userid,
        createdAt,
        status,
      };
      if (req.retrieve_all) {
        switch (status) {
          case "Order Request":
            response.data = {
              items: data.items,
              description: data.description,
            };
            break;
          case "Order Rejected":
            const reject_history_object = data.status_history.find(
              (element) => element.status === status
            );
            response.data = {
              date: reject_history_object.data,
              description: reject_history_object.description,
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
            response.message = "Your request is waiting to be approved";
            break;
          case "Order Rejected":
            const reject_history_object = data.status_history.find(
              (element) => element.status === status
            );
            response.data = {
              date: reject_history_object.data,
              description: reject_history_object.description,
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
                "Your order is being processed it will take some time so wait",
            };
            break;
          case "Dispatched":
            response.data = { tracking: data.tracking };
            break;

          case "Delivered":
            response.data.message =
              "Your order has been delivered successfully";
          // feedback=order.status_history.find((entry)=>entry.status==="Delivered")
        }
      }
      return res.status(200).json(response);
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
        approved: false,
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
