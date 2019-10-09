"use strict";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true }
});

userSchema.pre("save", function (next) {
  next();
});

module.exports = mongoose.model("user", userSchema);