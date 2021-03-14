const e = require("express");

const jwt = require("jsonwebtoken");
const env = require("dotenv");
exports.RequireSignin = (req, res, next) => {
  console.log("came to require sign in");
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[2];
    jwt.verify(token, process.env.SECRET_TOKEN, (error, user) => {
      if (error) {
        return res.status(405).json({
          message: "Your token has expired",
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "Authorization Required",
    });
  }
};

exports.permissionsArray = [
  "add_M_Permission",
  "view_M_Permission",
  "delete_M_Permission",
  "update_M_Permission",
  "view_O_Permission",
  "view_P_Permission",
  "view_D_Permission",
  "view_U_Permission",
];
