const express = require("express");
const {
  createPrices,
  updatePrices,
  getPricesAndDocuments,
} = require("../controller/prices");

const router = express.Router();

router.get("/createPrices", createPrices);
router.post("/updatePrices", updatePrices);
router.get("/getPricesAndDocuments", getPricesAndDocuments);

module.exports = router;
