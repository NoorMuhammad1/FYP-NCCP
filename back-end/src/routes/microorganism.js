const express = require("express");
const Category = require("../models/microorganisms");
const {
  addMicroorganism,
  findMicroorganism,
  deleteMicroorganism,
  updateMicroorganism,
  fetchData,
  getSearchInfo,
  getCatalogueData,
} = require("../controller/microorganism_database");

const {
  ValidateAddMicroorganismRequest,
  ValidateDeleteMicroorganismRequest,
  ValidateUpdateMicroorganismRequest,
  ValidateFindMicroorganismRequest,
} = require("../validators/microorganismRecordValidator");
const { RequireSignin } = require("../common-used/index");
const { checkPermission } = require("../validators/checkPermission");
const { requireSignin } = require("../controller/autheticate");
const router = express.Router();

router.post(
  "/addmicroorganism",
  RequireSignin,
  checkPermission("addMicroorganism"),
  ValidateAddMicroorganismRequest,
  addMicroorganism
);
router.post(
  "/findmicroorganism",
  ValidateFindMicroorganismRequest,
  findMicroorganism
);
router.post(
  "/deletemicroorganism",
  RequireSignin,
  checkPermission("deleteMicroorganism"),
  ValidateDeleteMicroorganismRequest,
  deleteMicroorganism
);
router.post(
  "/updatemicroorganism",
  RequireSignin,
  checkPermission("updateMicroorganism"),
  ValidateUpdateMicroorganismRequest,
  updateMicroorganism
);
router.get("/getSearchInfo", getSearchInfo);
router.post(
  "/catalogue",
  // RequireSignin,
  // checkPermission("viewMicroorganism"),
  getCatalogueData
);

router.get("/fetchData", fetchData);

module.exports = router;
