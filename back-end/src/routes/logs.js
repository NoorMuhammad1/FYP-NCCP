const express = require("express");
const {
  getLogs,
  getLogDetails,
  deleteLogEntries,
} = require("../controller/logs");

const router = express.Router();

router.get("/logslist", getLogs);
router.post("/getLogDetails", getLogDetails);
router.post("/deleteLogs", deleteLogEntries);

module.exports = router;
