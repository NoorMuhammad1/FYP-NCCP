const { uploadFile } = require("../common-used");
const sampleDocuments = require("../models/sampleDocuments");

exports.createDocuments = (req, res) => {
  const _documents = new sampleDocuments({
    order: [
      {
        title: "Document 1",
        document:
          "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135965/documents/Scope_Template_Updated_gsxdar.docx",
      },
      {
        title: "Document 2",
        document:
          "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135932/documents/Scope_Document_Template_BSCS_vhwxwf.docx",
      },
    ],
    general_deposit: [
      {
        title: "Document 1",
        document:
          "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135965/documents/Scope_Template_Updated_gsxdar.docx",
      },
      {
        title: "Document 2",
        document:
          "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135932/documents/Scope_Document_Template_BSCS_vhwxwf.docx",
      },
    ],
    patent_deposit: [
      {
        title: "Document 1",
        document:
          "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135965/documents/Scope_Template_Updated_gsxdar.docx",
      },
      {
        title: "Document 2",
        document:
          "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135932/documents/Scope_Document_Template_BSCS_vhwxwf.docx",
      },
    ],
    safe_deposit: [
      {
        title: "Document 1",
        document:
          "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135965/documents/Scope_Template_Updated_gsxdar.docx",
      },
      {
        title: "Document 2",
        document:
          "https://res.cloudinary.com/dl4rpeztt/raw/upload/v1618135932/documents/Scope_Document_Template_BSCS_vhwxwf.docx",
      },
    ],
  });

  _documents.save().then((error, data) => {
    if (error) {
      return res.status(400).json(error);
    }
    if (data) {
      return res.status(200).json(data);
    }
  });
};

exports.updateDocuments = async (req, res) => {
  const { title, documentFor } = req.body;
  const file = req.files[0];
  const uploaded_file = await uploadFile(file, "Sample Documents");

  const { order, general_deposit, safe_deposit, patent_deposit } = (
    await sampleDocuments.findById(
      process.env.SAMPLE_DOCUMENT_ID,
      "order general_deposit safe_deposit patent_deposit"
    )
  )._doc;

  switch (documentFor) {
    case "order":
      order.push({
        title,
        document: uploaded_file.url,
      });
      break;
    case "general_deposit":
      general_deposit.push({
        title,
        document: uploaded_file.url,
      });
      break;
    case "safe_deposit":
      safe_deposit.push({
        title,
        document: uploaded_file.url,
      });
      break;
    case "patent_deposit":
      patent_deposit.push({
        title,
        document: uploaded_file.url,
      });
      break;
    default:
      order.push({
        title,
        document: uploaded_file.url,
      });
      break;
  }
  sampleDocuments.findByIdAndUpdate(
    process.env.SAMPLE_DOCUMENT_ID,
    { order, general_deposit, safe_deposit, patent_deposit },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          message: "There was some error uploading the documents",
          error,
        });
      }
      if (data) {
        return res.status(200).json(data);
      }
    }
  );
};

exports.removeDocument = async (req, res) => {
  const { document_id } = req.body;
  let { order, general_deposit, safe_deposit, patent_deposit } = (
    await sampleDocuments.findById(
      process.env.SAMPLE_DOCUMENT_ID,
      "order general_deposit safe_deposit patent_deposit"
    )
  )._doc;
  order = order.filter((file) => file._id != document_id);
  general_deposit = general_deposit.filter((file) => file._id != document_id);
  safe_deposit = safe_deposit.filter((file) => file._id != document_id);
  patent_deposit = patent_deposit.filter((file) => file._id != document_id);
  sampleDocuments.findByIdAndUpdate(
    process.env.SAMPLE_DOCUMENT_ID,
    { order, general_deposit, safe_deposit, patent_deposit },
    (error, data) => {
      // console.log("deleted those documents");
      if (error) {
        return res.status(400).json(error);
      }
      if (data) {
        return res.status(200).json(data);
      }
    }
  );
};
