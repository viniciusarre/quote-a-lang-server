// content of index.js
const express = require("express");
const port = process.env.PORT || 6060;
const app = express();
const db = require("./config/db");
const bodyParser = require("body-parser");
const authRoutes = require("./modules/auth/routes");
const quoteRoutes = require("./modules/quotes/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

require("babel-register")({
  presets: ["env"]
});

app.use("/auth/", authRoutes);
app.use("/quotes/", quoteRoutes);

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  db();
  console.log(`server is listening on ${port}`);
});

module.exports = app;
