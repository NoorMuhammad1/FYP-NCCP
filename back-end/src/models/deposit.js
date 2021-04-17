const mongoose = require("mongoose");

const depositSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    items: [
      {
        name: String,
        quantity: Number,
      },
    ],
    description: { type: String, default: "" },
    type: { type: String, default: "General Deposit" },
    status: {
      type: String,
      enum: [
        "Deposit Request",
        "Document Submission",
        "Resubmit Documents",
        "Payment Submission",
        "Ready to Recieve",
        "Processing",
        "Deposited",
        "Cancelled",
      ],
      default: "Deposit Request",
    },
    documents: [
      {
        title: String,
        document: String,
        approved: Boolean,
        description: String,
        date: Date,
      },
    ],
    payment: { type: mongoose.Schema.Types.ObjectId, default: null },
    tracking: { type: String, default: "" },
    status_history: [
      {
        status: String,
        date: Date,
        description: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Deposit", depositSchema);
