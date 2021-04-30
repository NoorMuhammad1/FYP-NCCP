const express = require("express");
const {
  generateReport,
  depositReport,
  userReport,
  microorganismReport,
  paymentReport,
} = require("../controller/reports");

const router = express.Router();

router.post("/adminReports", generateReport);
router.post("/depositReport", depositReport);
router.post("/userReport", userReport);
router.post("/microorganismReport", microorganismReport);
router.post("/paymentReport", paymentReport);

module.exports = router;
