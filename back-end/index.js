const express = require("express");
const env = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/user");
const orderRouter = require("./src/routes/orders");
const depositRouter = require("./src/routes/deposit");
const microorganismRouter = require("./src/routes/microorganism");
const dashboardRouter = require("./src/routes/dashboard");
const paymentRouter = require("./src/routes/payments");
const sharingRouter = require("./src/routes/sharing");
const reportsRouter = require("./src/routes/reports");
const logsRouter = require("./src/routes/logs");
const pricesRouter = require("./src/routes/prices");
const documentsRouter = require("./src/routes/documents");
env.config();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
mongoose
  .connect(
    `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.heiyw.mongodb.net:27017,cluster0-shard-00-01.heiyw.mongodb.net:27017,cluster0-shard-00-02.heiyw.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-1h4t8y-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database Connected");
  });
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", microorganismRouter);
app.use("/api", dashboardRouter);
app.use("/api", orderRouter);
app.use("/api", depositRouter);
app.use("/api", paymentRouter);
app.use("/api", sharingRouter);
app.use("/api", reportsRouter);
app.use("/api", logsRouter);
app.use("/api", pricesRouter);
app.use("/api", documentsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
