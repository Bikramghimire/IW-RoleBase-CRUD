const express = require("express");
const createHttpsError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const connectFlash = require("connect-flash");

//router
const indexRouter = require("./routes/index.route");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
require("dotenv").config();

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
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));

//init session

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  next(createHttpsError.NotFound());
});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render("error_40x", { error });
  res.send(error);
});

app.listen(PORT, () => console.log(`the app is running at the port ${PORT}`));
