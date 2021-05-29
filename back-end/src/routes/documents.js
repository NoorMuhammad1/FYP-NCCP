const express = require("express");
const { unpackFormRequest } = require("../common-used");
const {
  createDocuments,
  updateDocuments,
  removeDocument,
} = require("../controller/documents");

const router = express.Router();

router.get("/createDocuments", createDocuments);
router.post("/updateDocuments", unpackFormRequest("file"), updateDocuments);
router.post("/removeDocument", removeDocument);

module.exports = router;
