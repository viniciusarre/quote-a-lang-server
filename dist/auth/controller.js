"use strict";

var helper = require("./helper");

module.export = signUp = function signUp(req, res) {
  console.log("====================================");
  // console.log(req.query);
  console.log(req.body);
  console.log("=================controller===================");
  var _req$body = req.body,
      user = _req$body.user,
      email = _req$body.email,
      password = _req$body.password;

  console.log(user, email, password);
  //    console.log("BODY >> ", req.body);
  helper.signUp(user, email, password).then(function (result) {
    res.status(200).json(result);
  }).catch(function (err) {
    res.status(500).json(err);
  });
};

module.export = login = function login(req, res, next) {
  var _req$body2 = req.body,
      user = _req$body2.user,
      password = _req$body2.password;

  helper.login(user, password).then(function (result) {
    res.status(200).json(result);
  }).catch(function (err) {
    if (err === "NOT FOUND") {
      res.status(404).json(err);
    } else {
      res.status(500).json(err);
    }
  });
};