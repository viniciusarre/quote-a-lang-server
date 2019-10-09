"use strict";

var User = require("../../models/User");

module.export = login = function login(user, password) {
  return new Promise(function (resolve, reject) {
    User.findOne({ user: user, password: password }).then(function (result) {
      if (result === null) {
        reject("NOT FOUND");
      } else {
        resolve(result);
      }
    }).catch(function (err) {
      reject(err);
    });
  });
};

module.export = signUp = function signUp(user, email, password) {
  console.log("HELPER >> ", user, email, password);
  return new Promise(function (resolve, reject) {
    var newUser = new User({
      user: user,
      email: email,
      password: password
    });
    newUser.save().then(function (result) {
      resolve(result);
    }).catch(function (err) {
      reject(err);
    });
  });
};