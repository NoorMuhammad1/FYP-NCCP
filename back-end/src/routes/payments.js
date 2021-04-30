const express = require("express");
const { orderPayment } = require("../controller/payments");

const router = express.Router();

router.post("/orderPayment", orderPayment);

module.exports = router;
