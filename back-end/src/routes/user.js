const express = require("express");
const { RequireSignin } = require("../common-used");
const {
  signup,
  signin,
  requireSignin,
  updateUserInfo,
  userData,
  getUsers,
  deleteUser,
  addUser,
  forgetPassword,
  verifyEmail,
  resetPassword,
} = require("../controller/autheticate");
const router = express.Router();
const {
  validateSignin,
  validateSignup,
  validateUserUpdate,
  validateAddUser,
  isHuman,
} = require("../validators/authentications");
const { checkPermission } = require("../validators/checkPermission");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

router.post("/signin", isHuman, validateSignin, signin);
router.post("/forget-password", forgetPassword);
router.post("/resetPassword", resetPassword);
router.post("/signup", validateSignup, signup);
router.post("/verifyEmail", verifyEmail);
router.post("/users", RequireSignin, checkPermission("viewUser"), getUsers);
router.post("/userData", RequireSignin, checkPermission("viewUser"), userData);
router.post("/updateUser", RequireSignin, validateUserUpdate, updateUserInfo);
router.post(
  "/deleteUser",
  RequireSignin,
  checkPermission("deleteUser"),
  deleteUser
);

router.post(
  "/addUser",
  RequireSignin,
  // upload.single("profile_picture"),
  checkPermission("addUser"),
  validateAddUser,
  addUser
);

module.exports = router;
