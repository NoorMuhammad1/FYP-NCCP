const express = require("express");
const { RequireSignin } = require("../common-used");
const { checkUserType } = require("../controller/orders");
const {
  orderPayment,
  getPayments,
  depositPayment,
  deletePayment,
  paymentDetails,
} = require("../controller/payments");
const { checkPermission } = require("../validators/checkPermission");

const router = express.Router();

router.post("/orderPayment", orderPayment);
router.post("/depositPayment", depositPayment);
router.post(
  "/deletePayment",
  RequireSignin,
  checkPermission("deletePayment"),
  deletePayment
);
router.get("/paymentlist", RequireSignin, checkUserType, getPayments);
router.post("/paymentDetails", RequireSignin, paymentDetails);
module.exports = router;
