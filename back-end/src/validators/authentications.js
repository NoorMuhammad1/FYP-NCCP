const Regx = require("regex");
const env = require("dotenv");
const fetch = require("node-fetch");
const { permissionsArray } = require("../common-used");

const validEmailExpression =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validPasswordExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

exports.validateSignin = (req, res, next) => {
  const {
    email,

    password,
  } = req.body;
  if (checkPassword(password) || checkEmail(email)) {
    return res.status(400).json({
      ...(checkEmail(email) ? { email: "Email is invalid" } : {}),
      ...(checkPassword(password) ? { password: "Password is invalid" } : {}),
    });
  }
  next();
};

exports.isHuman = async (req, res, next) => {
  fetch;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`,
    { method: "POST" }
  );
  const data = await response.json();
  if (!data.success) {
    return res.status(400).json({
      message: "The user is not a human",
    });
  }
  next();
};

exports.validateSignup = (req, res, next) => {
  const { firstname, lastname, email, type, role, affiliation, password } =
    req.body;
  if (
    !firstname.trim() ||
    !lastname.trim() ||
    !type.trim() ||
    !affiliation.trim() ||
    checkEmail(email) ||
    checkPassword(password)
  ) {
    return res.status(400).json({
      errors: {
        ...(!firstname.trim()
          ? { firstname: "firstname cannot be empty" }
          : {}),
        ...(!lastname.trim() ? { lastname: "lastname cannot be empty" } : {}),
        ...(!username.trim() ? { username: "username cannot be empty" } : {}),
        ...(!type.trim() ? { type: "type cannot be empty" } : {}),
        ...(!role.trim() ? { role: "role cannot be empty" } : {}),
        ...(!affiliation.trim()
          ? { affiliation: "affiliation cannot be empty" }
          : {}),
        ...(!description.trim()
          ? { description: "description cannot be empty" }
          : {}),
        ...(checkEmail(email.trim()) ? { email: "Email is invalid" } : {}),
        ...(checkPassword(password)
          ? { password: "The password does not match the requirements" }
          : {}),
      },
    });
  }

  req = checkPermissions(req);
  next();
};

exports.validateAddUser = (req, res, next) => {
  // console.log(req.body);
  const { firstname, lastname, email, password } = req.body;
  if (
    !firstname.trim() ||
    !lastname.trim() ||
    checkEmail(email) ||
    checkPassword(password)
  ) {
    return res.status(400).json({
      errors: {
        ...(!firstname.trim()
          ? { firstname: "firstname cannot be empty" }
          : {}),
        ...(!lastname.trim() ? { lastname: "lastname cannot be empty" } : {}),
        ...(!username.trim() ? { username: "username cannot be empty" } : {}),
        ...(!type.trim() ? { type: "type cannot be empty" } : {}),
        ...(!role.trim() ? { role: "role cannot be empty" } : {}),
        ...(!affiliation.trim()
          ? { affiliation: "affiliation cannot be empty" }
          : {}),
        ...(!description.trim()
          ? { description: "description cannot be empty" }
          : {}),
        ...(checkEmail(email.trim()) ? { email: "Email is invalid" } : {}),
        ...(checkPassword(password)
          ? { password: "The password does not match the requirements" }
          : {}),
      },
    });
  }
  req = checkPermissions(req);
  next();
};

checkEmail = (email) => {
  return !validEmailExpression.test(email);
};

checkPassword = (password) => {
  return !validPasswordExpression.test(password);
};

const checkPermissions = (req) => {
  if (!req.body.permissions) {
    req.body.permissions = {};
  }
  permissionsArray.map((permission) => {
    if (!req.body.permissions[permission]) {
      req.body.permissions[permission] = false;
    }
  });
  return req;
};

exports.validateUserUpdate = (req, res, next) => {
  const userAttributes = [
    "_id",
    "type",
    "firstname",
    "lastname",
    "email",
    "password",
    "contactNumber",
    "profilePicture",
    "affiliation",
    "role",
    "username",
    "description",
    "permissions",
    "add_M_Permission",
    "update_M_Permission",
    "delete_M_Permission",
    "view_M_Permission",
    "view_U_Permission",
    "view_D_Permission",
    "view_P_Permission",
    "view_O_Permission",
  ];

  console.log("came to authenticate the request");
  Object.keys(req.body.data).map((attr) => {
    if (userAttributes.includes(attr) == false) {
      return res.status(400).json({
        message: "One or more attributes in the request were illegal",
      });
    }
  });
  next();
};
