const e = require("express");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { cloudinary } = require("./cloudinary");
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.RequireSignin = (req, res, next) => {
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

exports.unpackFormRequest = (fieldname) => {
  return async (req, res, next) => {
    const upload = multer({ storage }).array(fieldname);
    console.log("came to unpack the request");
    upload(req, res, (error) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: "found some error while parsing the form data",
          error,
        });
      }
      console.log("nothing");
      next();
    });
  };
};

exports.uploadFile = async (file, foldername) => {
  try {
    const path = file.path;
    const date = new Date().toISOString();
    const data = await cloudinary.uploader.upload(
      path,
      {
        public_id: `${foldername}/${file.filename}_${date}`,
        tags: foldername,
        resource_type: "auto",
      },
      (error) => {
        if (error) {
          console.log("err", error);
        }
      }
    );
    if (data) {
      fs.unlinkSync(path);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
