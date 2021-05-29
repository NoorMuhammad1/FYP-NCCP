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
const deposit = require("../models/deposit");
const prices = require("../models/prices");
const microorganisms = require("../models/microorganisms");

exports.getPayments = async (req, res) => {
  const condition = req.retrieve_all ? {} : { _id: req.user._id };
  Payment.find(
    condition,
    "_id status type payment_for order_deposit_id amount createdAt user_id",
    async (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was some error",
        });
      }
      if (data) {
        data = await Promise.all(
          data.map(async (one_payment) => {
            const user_data = await user.findById(
              one_payment.user_id,
              "firstname lastname profilePicture"
            );
            return {
              payment_id: one_payment._id,
              customer: `${user_data.firstname} ${user_data.lastname}`,
              profilePicture: user_data.profilePicture,
              payment_for: one_payment.payment_for,
              order_deposit_id: one_payment.order_deposit_id,
              amount: one_payment.amount,
              // status: one_payment.status,
              date: one_payment.createdAt,
            };
          })
        );
        return res.status(200).json(data);
      }
    }
  );
};

exports.depositPayment = async (req, res) => {
  const { token, deposit_id, address } = req.body;
  const idempotencyKey = uuid();
  // console.log(token);
  try {
    const { userid, total } = (
      await deposit.findById(deposit_id, "userid total").exec()
    )._doc;
    console.log(total);
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
        description: `deposit payment for amount of ${total} done by the user with id ${userid} on ${new Date()}`,
      },
      { idempotencyKey }
    );
    // console.log(charge);
    const _payment = new Payment({
      payment_id: charge.id,
      amount: charge.amount / 100,
      currency: charge.currency,
      stripe_customer_id: charge.customer,
      user_id: userid,
      payment_for: "deposit",
      order_deposit_id: deposit_id,
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
      await deposit.findByIdAndUpdate(
        deposit_id,
        { status: "Awaiting Dispatch", address },
        (error, data) => {
          if (error) {
            return res.status(400).json({
              message:
                "There has been an error while changing the status from payment to processing",
              error,
            });
          }
          if (data) {
            return res.status(200).json({
              message: "Payment has been successfull",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "There has been an error while processing the payment",
      error,
    });
  }
};

exports.orderPayment = async (req, res) => {
  const { products, token, order_id, address } = req.body;
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
      await order.findByIdAndUpdate(
        order_id,
        { status: "Processing", address },
        (error, data) => {
          if (error) {
            return res.status(400).json({
              message:
                "There has been an error while changing the status from payment to processing",
              error,
            });
          }
          if (data) {
            return res.status(200).json({
              message: "Payment has been successfull",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "There has been an error while processing the payment",
      error,
    });
  }
};
exports.deletePayment = async (req, res) => {
  const { paymentsToDelete } = req.body;
  await Payment.deleteMany({ _id: paymentsToDelete }, (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error deleteing the payments",
        error,
      });
    }
    if (data) {
      return res.status(200).json({
        message: "Payments delete successfully",
      });
    }
  });
};

exports.paymentDetails = async (req, res) => {
  const { payment_id } = req.body;
  await Payment.findById(payment_id, "", async (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error while fetching the payment details",
        error,
      });
    } else if (data) {
      try {
        let deposit_order;
        let price = 0;
        let total = 0;
        let items;
        console.log(data.payment_for);
        console.log(data.order_deposit_id);
        const all_prices = (
          await prices.findById(process.env.PRICES_DOCUMENT_ID)
        )._doc;
        if (data.payment_for.toLowerCase() == "deposit") {
          deposit_order = (
            await deposit.findById(data.order_deposit_id, "address items type")
          )._doc;
          if (deposit_order.type.toLowerCase() == "general deposit") {
            price = all_prices.general_deposit;
          } else if (deposit_order.type.toLowerCase() == "safe deposit") {
            price = all_prices.safe_deposit;
          } else {
            price = all_prices.patent_deposit;
          }
          items = await Promise.all(
            await deposit_order.items.map(async (item) => {
              total += item.quantity * price;
              return {
                microorganism_name: `${item.genus} ${item.species}`,
                quantity: item.quantity,
                sub_total: item.quantity * price,
              };
            })
          );
          // items = await Promise.all(
          //   deposit_order.items.map(async (item) => {
          //     total += item.quantity * price;
          //     return {
          //       microorganism_name: `${item.genus} ${item.species}`,
          //       quantity: item.quantity,
          //       price,
          //       sub_total: item.quantity * price,
          //     };
          //   })
          // );
        } else {
          deposit_order = (
            await order.findById(data.order_deposit_id, "address items")
          )._doc;
          price = all_prices.order;
          items = await Promise.all(
            deposit_order.items.map(async (item) => {
              total += item.quantity * price;
              const micro = (
                await microorganisms.findById(
                  item.microorganism_id,
                  "CoreDataSets.Genus CoreDataSets.SpeciesEpithet"
                )
              )._doc;
              console.log(micro.CoreDataSets);
              total += item.quantity * price;
              return {
                microorganism_name: `${micro.CoreDataSets.Genus} ${micro.CoreDataSets.SpeciesEpithet}`,
                quantity: item.quantity,
                sub_total: item.quantity * price,
              };
            })
          );
        }
        const user_details = (
          await user.findById(data.user_id, "firstname lastname")
        )._doc;
        return res.status(200).json({
          username: `${user_details.firstname} ${user_details.lastname}`,
          address: deposit_order.address,
          email: data.email,
          date: new Date(data.createdAt).toLocaleDateString(),
          amount: data.amount,
          payment_for: data.payment_for,
          description: data.description,
          card: data.card,
          items: items,
        });
      } catch (error) {
        console.log("error", error);
      }
    } else {
      return res.status(400).json({
        message: "No such payment exist in the system",
      });
    }
  });
};
