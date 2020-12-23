var mongoose = require("mongoose");

module.exports = () => {
  const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/quote-a-lang";

  global.db = mongoose.connect(DB_URI, { useNewUrlParser: true });
  mongoose.connection.on("connected", function () {
    console.log("Connected to mongo");
  });
  mongoose.connection.on("error", function (err) {
    console.log("=====An error ocurred: " + err);
  });
  mongoose.connection.on("disconnected", function () {
    console.log("Mongo Disconnected");
  });
};
