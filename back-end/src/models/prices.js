const mongoose = require("mongoose");

const pricesSchema = new mongoose.Schema(
  {
    order: Number,
    general_deposit: Number,
    safe_deposit: Number,
    patent_deposit: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prices", pricesSchema);
