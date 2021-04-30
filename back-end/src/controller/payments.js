// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51IhcBtCueTz3N4RSPKazGPYXmvuzwys5QazLWAgAWbNIqEngyHpl7bjfPBlsdUqGWhilPXrFFTYtVGJmH7YO8o7C00ZvDeQw8V"
);
const { clearCustomQueryHandlers } = require("puppeteer");
const uuid = require("uuid/v4");
const order = require("../models/order");
const user = require("../models/user");
const Payment = require("../models/payment");
const { OrderDetails } = require("./orders");

exports.orderPayment = async (req, res) => {
  const { products, token, order_id } = req.body;
  const idempotencyKey = uuid();
  //   console.log(token);
  try {
    const { userid, total } = (
      await order.findById(order_id, "userid total").exec()
    )._doc;
    const { email } = (await user.findById(userid, "email").exec())._doc;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await stripe.charges.create(
      {
        amount: total * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `order payment for amount of ${total} done by the user with id ${userid} on ${new Date()}`,
      },
      { idempotencyKey }
    );
    console.log(charge);
    const _payment = new Payment({
      payment_id: charge.id,
      amount: charge.amount / 100,
      currency: charge.currency,
      stripe_customer_id: charge.customer,
      user_id: userid,
      payment_for: "order",
      order_deposit_id: order_id,
      description: charge.description,
      status: charge.outcome.network_status,
      card: {
        brand: charge.payment_method_details.card.brand,
        country: charge.payment_method_details.card.country,
        exp_month: charge.payment_method_details.card.exp_month,
        exp_year: charge.payment_method_details.card.exp_year,
        funding: charge.payment_method_details.card.funding,
      },
      email: charge.receipt_email,
      receipt_url: charge.receipt_url,
    });
    const payment_done = await _payment.save();
    if (payment_done) {
      return res.status(200).json({
        message: "Payment has been successfull",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "There has been an error while processing the payment",
      error,
    });
  }
};
