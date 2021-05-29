const prices = require("../models/prices");
const sampleDocuments = require("../models/sampleDocuments");

exports.createPrices = (req, res) => {
  const _prices = new prices({
    order: 200,
    general_deposit: 300,
    patent_deposit: 500,
    safe_deposit: 400,
  });

  _prices.save().then((error, data) => {
    if (error) {
      return res.status(400).json(error);
    }
    if (data) {
      return res.status(200).json(data);
    }
  });
};

exports.updatePrices = (req, res) => {
  const { data } = req.body;
  prices.findByIdAndUpdate(
    process.env.PRICES_DOCUMENT_ID,
    { ...data },
    (error, data) => {
      if (error) {
        return res.status(400).json(error);
      }
      if (data) {
        return res
          .status(200)
          .json({ message: "Prices were updated successfully", data });
      }
    }
  );
};

exports.getPricesAndDocuments = async (req, res) => {
  try {
    const price = (
      await prices.findById(
        process.env.PRICES_DOCUMENT_ID,
        "-_id order general_deposit safe_deposit patent_deposit"
      )
    )._doc;
    const documents = (
      await sampleDocuments.findById(
        process.env.SAMPLE_DOCUMENT_ID,
        "-_id order general_deposit safe_deposit patent_deposit"
      )
    )._doc;
    return res.status(200).json({
      price,
      documents,
    });
  } catch (error) {
    return res.status(400).json({
      message: "There was some error fetching the prices or documents",
      error,
    });
  }
};
