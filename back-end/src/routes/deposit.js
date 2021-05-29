const express = require("express");
const { RequireSignin, unpackFormRequest } = require("../common-used");
const {
  getDepositList,
  CreateDeposit,
  DepositDetails,
  ChangeDepositStatus,
  ChangeDepositDocumentStatus,
  SubmitDepositTrackingNumber,
  RejectDeposit,
  SubmitDepositDocuments,
  ApproveDepositDocument,
  RejectDepositDocument,
  rejectDepositItems,
  deleteDeposit,
} = require("../controller/deposits");
const { checkUserType, SubmitDocuments } = require("../controller/orders");
const { checkPermission } = require("../validators/checkPermission");
const router = express.Router();

router.post("/createDeposit", RequireSignin, CreateDeposit);
router.get("/depositlist", RequireSignin, checkUserType, getDepositList);
router.post("/depositdetails", RequireSignin, checkUserType, DepositDetails);
router.post("/rejectDeposit", RequireSignin, checkUserType, RejectDeposit);

router.post(
  "/deleteDeposit",
  RequireSignin,
  checkPermission("deleteDeposit"),
  deleteDeposit
);

router.post(
  "/submitDepositDocuments",
  RequireSignin,
  unpackFormRequest("documents"),
  SubmitDocuments
);
router.post(
  "/approveDepositDocument",
  RequireSignin,
  checkUserType,
  ApproveDepositDocument
);
router.post(
  "/rejectDepositDocument",
  RequireSignin,
  checkUserType,
  RejectDepositDocument
);

router.post(
  "/submitDepositFiles",
  RequireSignin,
  unpackFormRequest("files"),
  SubmitDepositDocuments
);
router.post("/rejectDepositItems", rejectDepositItems);
router.post("/changeDepositStatus", ChangeDepositStatus);
router.post("/changeDepositDocumentStatus", ChangeDepositDocumentStatus);
router.post("/submitDepositTrackingNumber", SubmitDepositTrackingNumber);
module.exports = router;
