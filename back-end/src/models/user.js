const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    resetLink: {
      type: String,
      default: "",
    },
    hash_password: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: "String",
      enum: [
        "Student",
        "ResearchInstituteRepresentative",
        "IndustryRepresentative",
      ],
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "internal", "external"],
      default: "external",
    },
    affiliation: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      max: 500,
      default: "NULL",
    },
    contactNumber: { type: String, default: "NULL" },
    profilePicture: { type: String, default: "NULL" },
    permissions: {
      add_M_Permission: { type: Boolean, default: false },
      view_M_Permission: { type: Boolean, default: true },
      delete_M_Permission: { type: Boolean, default: false },
      delete_O_Permission: { type: Boolean, default: false },
      delete_D_Permission: { type: Boolean, default: false },
      delete_P_Permission: { type: Boolean, default: false },
      update_M_Permission: { type: Boolean, default: false },
      view_U_Permission: { type: Boolean, default: false },
      update_U_Permission: { type: Boolean, default: false },
      delete_U_Permission: { type: Boolean, default: false },
      view_O_Permission: { type: Boolean, default: false },
      view_D_Permission: { type: Boolean, default: false },
      view_P_Permission: { type: Boolean, default: false },
      add_U_Permission: { type: Boolean, default: false },
    },
  },
  { timestamp: true }
);

//Virtual password hashing method

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};
module.exports = mongoose.model("User", userSchema);
