const express = require("express");
const {
  generateReport,
  depositReport,
  userReport,
  microorganismReport,
  paymentReport,
  orderReport,
} = require("../controller/reports");

const router = express.Router();

router.post("/adminReports", generateReport);
router.post("/depositReport", depositReport);
router.post("/orderReport", orderReport);
router.post("/userReport", userReport);
router.post("/microorganismReport", microorganismReport);
router.post("/paymentReport", paymentReport);

module.exports = router;
