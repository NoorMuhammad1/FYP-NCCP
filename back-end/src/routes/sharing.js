const express = require("express");
const { shareData } = require("../controller/sharing");

const router = express.Router();

router.post("/sharing", shareData);

module.exports = router;
