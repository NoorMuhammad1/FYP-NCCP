const mongoose = require("mongoose");
const user = require("./user");

const logsSchema = mongoose.Schema(
  {
    logid: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    request: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    error: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

logsSchema.virtual("name").set(async function (userid) {});
logsSchema.method("getUserName", async (userid, callback) => {
  const { firstname, lastname } = await user.findById(
    userid,
    "firstname lastname"
  );
  callback(`${firstname} ${lastname}`);
});
module.exports = mongoose.model("Logs", logsSchema);
