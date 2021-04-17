const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    items: [
      {
        microorganism_id: mongoose.Schema.Types.ObjectId,
        quantity: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      enum: [
        "Order Request",
        "Document Submission",
        "Resubmit Documents",
        "Payment Submission",
        "Processing",
        "Order Dispatched",
        "Completed",
        "Cancelled",
      ],
      default: "Order Request",
    },
    documents: [
      {
        title: String,
        document: String,
        approved: Boolean,
        description: String,
        date: Date,
        // default: [],
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
module.exports = mongoose.model("Order", orderSchema);
