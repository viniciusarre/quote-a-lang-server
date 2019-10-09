"use strict";

// content of index.js
var express = require("express");
var port = process.env.PORT || 6060;
var app = express();
var db = require("./config/db");
var bodyParser = require("body-parser");
var authRoutes = require("../modules/auth/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.defaultConfiguration();

require("babel-register")({
  presets: ["env"]
});

app.use("/auth/", authRoutes);

app.listen(port, function (err) {
  if (err) {
    return console.log("something bad happened", err);
  }
  db();
  console.log("server is listening on " + port);
});
// app.configure( () => {
//     app.use(express.bodyParser());
//     app.use(app.router);
// });

module.exports = app;