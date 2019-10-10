const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  _id: { type: Number },
  language: { type: String, default: "fr" },
  author: { type: String },
  flag: { type: String },
  name_url: { type: String },
  data: { type: Array }
});

quoteSchema.pre("save", next => {
  next();
});

module.exports = mongoose.model("quote", quoteSchema);
