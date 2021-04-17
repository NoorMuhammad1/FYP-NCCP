const express = require("express");
const { RequireSignin, unpackFormRequest } = require("../common-used");
const {} = require("../controller/orders");
const router = express.Router();

router.post("/createOrder", CreateOrder);
router.get("/orderlist", RequireSignin, checkUserType, getOrderList);
router.post("/orderdetails", RequireSignin, checkUserType, OrderDetails);
router.post(
  "/submitDocuments",
  RequireSignin,
  unpackFormRequest("documents"),
  SubmitDocuments
);

router.post("/changeOrderStatus", ChangeOrderStatus);
router.post("/changeOrderDocumentStatus", ChangeOrderDocumentStatus);
router.post("/submitTrackingNumber", SubmitTrackingNumber);
module.exports = router;
