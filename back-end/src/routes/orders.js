const express = require("express");
const { RequireSignin, unpackFormRequest } = require("../common-used");
const {
  CreateOrder,
  getOrderList,
  checkUserType,
  OrderDetails,
  SubmitDocuments,
  ChangeOrderStatus,
  ChangeOrderDocumentStatus,
  SubmitTrackingNumber,
  RejectOrder,
  ApproveOrderDocument,
  RejectOrderDocument,
  SubmitOrderDocuments,
  deleteOrder,
} = require("../controller/orders");
const { checkPermission } = require("../validators/checkPermission");
const router = express.Router();

router.post("/createOrder", RequireSignin, CreateOrder);
router.get("/orderlist", RequireSignin, checkUserType, getOrderList);
router.post("/orderdetails", RequireSignin, checkUserType, OrderDetails);
router.post("/orderdetails", RequireSignin, checkUserType, OrderDetails);
router.post("/rejectOrder", RequireSignin, checkUserType, RejectOrder);
router.post(
  "/deleteOrder",
  RequireSignin,
  checkPermission("deleteOrder"),
  deleteOrder
);
router.post(
  "/approveOrderDocument",
  RequireSignin,
  checkUserType,
  ApproveOrderDocument
);
router.post(
  "/rejectOrderDocument",
  RequireSignin,
  checkUserType,
  RejectOrderDocument
);
router.post(
  "/submitDocuments",
  RequireSignin,
  unpackFormRequest("documents"),
  SubmitDocuments
);
router.post(
  "/submitOrderFiles",
  RequireSignin,
  unpackFormRequest("files"),
  SubmitOrderDocuments
);
router.post("/changeOrderStatus", ChangeOrderStatus);
router.post("/changeOrderDocumentStatus", ChangeOrderDocumentStatus);
router.post("/submitTrackingNumber", SubmitTrackingNumber);
module.exports = router;
