const mongoose = require("mongoose");

const documentsSchema = new mongoose.Schema(
  {
    order: [{ title: String, document: String }],
    general_deposit: [{ title: String, document: String }],
    safe_deposit: [{ title: String, document: String }],
    patent_deposit: [{ title: String, document: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Documents", documentsSchema);
