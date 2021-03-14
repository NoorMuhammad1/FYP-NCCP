const { response } = require("express");
const express = require("express");
const microorganisms = require("../models/microorganisms");
const user = require("../models/user");
const { checkPermission } = require("../validators/checkPermission");
const { getSearchInfo } = require("./microorganism_database");
const router = express.Router();

exports.dashboardData = async (req, res) => {
  let response = {};
  console.log("value of req.permissions: ");
  console.log(req.permissions);
  const permissions = JSON.parse(JSON.stringify(req.permissions));
  response.catalogue = permissions.view_M_Permission
    ? await microorganisms.find(
        {},
        "CoreDataSets.Genus CoreDataSets.AccessionNumber CoreDataSets.OrganismType CoreDataSets.Status"
      )
    : undefined;
  response.users = permissions.view_U_Permission
    ? await user.find({}, "firstname lastname email role")
    : undefined;

  res.status(200).json({
    data: response,
  });
};
