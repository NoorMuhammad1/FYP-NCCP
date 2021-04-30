const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    payment_id: String,
    amount: Number,
    currency: String,
    stripe_customer_id: String,
    user_id: mongoose.Schema.Types.ObjectId,
    description: String,
    status: String,
    payment_for: String,
    order_deposit_id: String,
    card: {
      brand: String,
      country: String,
      exp_month: Number,
      exp_year: Number,
      funding: String,
    },
    email: String,
    receipt_url: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", paymentSchema);
