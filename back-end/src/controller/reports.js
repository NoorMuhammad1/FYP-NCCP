const deposit = require("../models/deposit");
const microorganisms = require("../models/microorganisms");
const order = require("../models/order");
const user = require("../models/user");
const payment = require("../models/payment");
exports.generateReport = async (req, res) => {
  try {
    const orderCount = await order.countDocuments({}).exec();
    const userCount = await user.countDocuments({}).exec();
    const microorganismCount = await microorganisms.countDocuments({}).exec();
    const depositCount = await deposit.countDocuments({}).exec();
    return res.status(200).json({
      total_orders: orderCount,
      total_deposits: depositCount,
      total_users: userCount,
      total_microorganisms: microorganismCount,
    });
  } catch (error) {
    return res.status(400).json({
      message: "There was some error while generating the report",
      error,
    });
  }
};

exports.paymentReport = async (req, res) => {
  const {
    minimum_payment_amount,
    maximum_payment_amount,
    starting_date,
    ending_date,
    brand,
    card_type,
  } = req.body;
  try {
    let payments = await payment.find({}).exec();
    payments = payments.filter((one_payment) => {
      if (brand && one_payment.brand !== brand) {
        return false;
      }
      if (starting_date && ending_date) {
        if (
          one_payment.createdAt < starting_date ||
          one_payment.createdAt > ending_date
        ) {
          return false;
        }
      }
      if (minimum_payment_amount && maximum_payment_amount) {
        if (
          one_payment.total < minimum_payment_amount ||
          one_payment.total > maximum_payment_amount
        ) {
          return false;
        }
      }
      if (card_type && one_payment.funding !== card_type) {
        return false;
      }
      return true;
    });
    // const payment_report = payments.map((one_payment)=>{
    //   return {
    //     amount:one_payment.amount,
    //     user_id:one_payment.amount,
    //     currency:one_payment.currency,
    //     email:one_payment.email,
    //     status:one_payment.status,
    //     card:one_payment.card,

    //   }
    // });
    return res.status(200).json(payments);
  } catch (error) {
    return res.status(400).json({
      message: "There was some error while generating the report",
      error,
    });
  }
};

exports.orderReport = async (req, res) => {
  try {
    let orders = await order.find({}).exec();
    const status = undefined;
    const starting_date = undefined;
    const ending_date = undefined;
    const minimum_payment_amount = undefined;
    const maximum_payment_amount = undefined;
    const tracking = undefined;
    orders = orders.filter((order) => {
      if (status && order.status !== status) {
        return false;
      }
      if (starting_date && ending_date) {
        if (order.createdAt < starting_date || order.createdAt > ending_date) {
          return false;
        }
      }
      if (minimum_payment_amount && maximum_payment_amount) {
        if (
          order.total < minimum_payment_amount ||
          order.total > maximum_payment_amount
        ) {
          return false;
        }
      }
      if (tracking && order.tracking !== tracking) {
        return false;
      }
      return true;
    });
    const order_report = await Promise.all(
      orders.map(async (order) => {
        const order_user = await user.findOne(
          { _id: order.userid },
          "firstname lastname"
        );
        const microorganism_names = await Promise.all(
          order.items.map(async (microorganism) => {
            const micro = await microorganisms
              .findById(
                microorganism.microorganism_id,
                "CoreDataSets.Genus CoreDataSets.SpeciesEpithet"
              )
              .exec();
            return `${micro.CoreDataSets.Genus} ${micro.CoreDataSets.SpeciesEpithet}`;
          })
        );
        return {
          order_id: order._id,
          user_id: order_user._id,
          user_name: `${order_user.firstname} ${order_user.lastname}`,
          destination: order.destination,
          date: order.createdAt,
          payment_amount: order.total,
          current_status: order.status,
          delivery_date: order.delivery_date,
          microorganism_names,
          tracking_id: order.tracking,
        };
      })
    );
    return res.status(200).json(order_report);
  } catch (error) {
    return res.status(400).json({
      message: "There was some error while generating the report",
      error,
    });
  }
};

exports.depositReport = async (req, res) => {
  try {
    let deposits = await deposit.find({}).exec();
    const {
      status,
      starting_date,
      ending_date,
      minimum_payment_amount,
      maximum_payment_amount,
      tracking,
      type,
    } = req.body;
    deposits = deposits.filter((deposit) => {
      if (status && deposit.status !== status) {
        return false;
      }
      if (starting_date && ending_date) {
        if (
          deposit.createdAt < starting_date ||
          deposit.createdAt > ending_date
        ) {
          return false;
        }
      }
      if (minimum_payment_amount && maximum_payment_amount) {
        if (
          deposit.total < minimum_payment_amount ||
          deposit.total > maximum_payment_amount
        ) {
          return false;
        }
      }
      if (tracking && deposit.tracking !== tracking) {
        return false;
      }

      if (type && deposit.type !== type) {
        return false;
      }
      return true;
    });
    const deposit_report = await Promise.all(
      deposits.map(async (deposit) => {
        const deposit_user = await user.findOne(
          { _id: deposit.userid },
          "firstname lastname"
        );
        const microorganism_names = await Promise.all(
          deposit.items.map(async (microorganism) => {
            const micro = await microorganisms
              .findById(
                microorganism.microorganism_id,
                "CoreDataSets.Genus CoreDataSets.SpeciesEpithet"
              )
              .exec();
            return `${micro.CoreDataSets.Genus} ${micro.CoreDataSets.SpeciesEpithet}`;
          })
        );
        return {
          deposit_id: deposit._id,
          user_id: deposit_user._id,
          user_name: `${deposit_user.firstname} ${deposit_user.lastname}`,
          destination: deposit.destination,
          date: deposit.createdAt,
          payment_amount: deposit.total,
          current_status: deposit.status,
          delivery_date: deposit.delivery_date,
          microorganism_names,
          tracking_id: deposit.tracking,
        };
      })
    );
    return res.status(200).json(deposit_report);
  } catch (error) {
    return res.status(400).json({
      message: "There was some error while generating the report",
      error,
    });
  }
};

exports.userReport = async (req, res) => {
  try {
    let users = await user.find({}).exec();
    const { starting_date, ending_date, type } = req.body;
    users = users.filter((user) => {
      if (starting_date && ending_date) {
        if (user.createdAt < starting_date || user.createdAt > ending_date) {
          return false;
        }
      }
      if (type && user.type !== type) {
        return false;
      }
      return true;
    });
    const users_report = await Promise.all(
      users.map(async (one_user) => {
        const user_orders = (
          await order.find({ userid: one_user._id }, "_id")
        ).flatMap((one_order) => {
          return one_order._id;
        });

        const user_deposits = (
          await deposit.find({ userid: one_user._id }, "_id")
        ).flatMap((one_deposit) => one_deposit._id);

        const user_payments = (
          await payment.find({ user_id: one_user._id }, "_id")
        ).flatMap((one_payment) => one_payment._id);
        return {
          user_id: one_user._id,
          username: `${one_user.firstname} ${one_user.lastname}`,
          usertype: one_user.role,
          orders: user_orders || [],
          deposits: user_deposits || [],
          payments: user_payments || [],
          order_count: user_orders.length || 0,
          deposit_count: user_deposits.length || 0,
          payment_amount: user_payments.length || 0,
        };
      })
    );
    return res.status(200).json(users_report);
  } catch (error) {
    return res.status(400).json({
      message: "There was some error while generating the report",
      error,
    });
  }
};

exports.microorganismReport = async (req, res) => {
  try {
    let microorganism_list = await microorganisms.find({}).exec();
    const {
      genus,
      species,
      type,
      starting_date,
      ending_date,
      bio_hazard_level,
    } = req.body;
    microorganism_list = microorganism_list.filter(async (micro) => {
      if (genus && micro.CoreDataSets.genus !== genus) {
        return false;
      }
      if (species && micro.CoreDataSets.SpeciesEpithet !== species) {
        return false;
      }
      if (starting_date && ending_date) {
        if (
          micro.CoreDataSets.DateOfIsolation < starting_date ||
          micro.CoreDataSets.DateOfIsolation > ending_date
        ) {
          return false;
        }
      }
      if (
        bio_hazard_level &&
        micro.StrainAdministration.BioHazardLevel !== bio_hazard_level
      ) {
        return false;
      }
      if (type && micro.CoreDataSets.OrganismType !== type) {
        return false;
      }
      return true;
    });

    const microorganism_report = await Promise.all(
      microorganism_list.map(async (micro) => {
        const micro_orders = (
          await order.find({ "items.microorganism_id": micro._id }, "_id")
        ).flatMap((one_deposit) => {
          return one_deposit._id;
        });
        const micro_deposits = (
          await deposit.find({ "items.microorganism_id": micro._id }, "_id")
        ).flatMap((one_deposit) => {
          return one_deposit._id;
        });
        return {
          accesion_number: micro.CoreDataSets.AccessionNumber,
          name: `${micro.CoreDataSets.Genus} ${micro.CoreDataSets.SpeciesEpithet}`,
          bio_hazard_level: micro.StrainAdministration.BioHazardLevel,
          type: micro.CoreDataSets.Status,
          organismType: micro.CoreDataSets.OrganismType,
          other_collection_numbers: micro.CoreDataSets.OtherCollectionNumbers,
          date_of_isolation: micro.CoreDataSets.DateOfIsolation,
          orders: micro_orders || [],
          order_count: micro_orders.length || 0,
          deposits: micro_deposits || [],
          deposit_count: micro_deposits.length || 0,
        };
      })
    );

    return res.status(200).json(microorganism_report);
  } catch (error) {
    return res.status(400).json({
      message: "There was some error while generating the report",
      error,
    });
  }
};
