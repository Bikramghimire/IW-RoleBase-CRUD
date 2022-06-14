const express = require("express");
const createHttpsError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
//router
const indexRouter = require("./routes/index.route");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected.........");
  })
  .catch(() => {
    console.log("mongo is not connected");
  });

app.use("/", indexRouter);

app.use((req, res, next) => {
  next(createHttpsError.NotFound());
});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.send(error);
});

app.listen(PORT, () => console.log(`the app is running at the port ${PORT}`));
