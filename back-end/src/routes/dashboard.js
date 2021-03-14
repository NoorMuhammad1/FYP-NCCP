const express = require("express");
const { RequireSignin } = require("../common-used");
const { dashboardData } = require("../controller/dashboard");
const { getPermission } = require("../validators/checkPermission");
const router = express.Router();

router.post("/dashboardData", RequireSignin, getPermission, dashboardData);

module.exports = router;
