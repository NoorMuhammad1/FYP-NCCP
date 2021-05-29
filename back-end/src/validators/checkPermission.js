const { compareSync } = require("bcrypt");
const e = require("express");
const User = require("../models/user");
exports.checkPermission = (permission) => {
  console.log("came to check the permission");
  return async (req, res, next) => {
    await User.findById(req.user._id, (error, user) => {
      if (error) {
        res.status(400).json({
          error: error,
        });
      }
      if (user) {
        if (hasPermission(JSON.parse(JSON.stringify(user)), permission)) {
          return res.status(400).json({
            message: "Requesting user does not have the permission for this.",
          });
        }
        next();
      } else {
        res.status(400).json({
          message: "No such user exists in the system",
        });
      }
    });
  };
};

exports.getPermission = (req, res, next) => {
  const { id } = req.body;
  User.findById(id, "permissions", (error, data) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (data) {
      req.permissions = data.permissions;
      next();
    } else {
      return res.status(300).json({
        message: "such a user does not exist in the system",
      });
    }
  });
};

hasPermission = (user, permission) => {
  switch (permission) {
    case "addMicroorganism":
      return !user.permissions.add_M_Permission;
    case "viewMicroorganism":
      return !user.permissions.view_M_Permission;
    case "deleteMicroorganism":
      return !user.permissions.delete_M_Permission;
    case "deleteDeposit":
      return !user.permissions.delete_D_Permission;
    case "deleteOrder":
      return !user.permissions.delete_O_Permission;
    case "deletePayment":
      return !user.permissions.delete_P_Permission;
    case "updateMicroorganism":
      return !user.permissions.update_M_Permission;
    case "viewUser":
      return !user.permissions.view_U_Permission;
    case "updateUser":
      return !user.permissions.update_U_Permission;
    case "addUser":
      return !user.permissions.add_U_Permission;
    case "deleteUser":
      return !user.permissions.delete_U_Permission;
    default:
      return true;
  }
};
