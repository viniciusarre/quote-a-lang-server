const mongoose = require("mongoose");

const fraseSchema = new mongoose.Schema({
  _id: { type: Number },
  idioma: { type: String, default: "fr" },
  autor: { type: String },
  bandeira: { type: String },
  nome_url: { type: String },
  dados: { type: Array }
});

fraseSchema.pre("save", next => {
  next();
});

module.exports = mongoose.model("frase", fraseSchema);
