const app = require('./app');
const db = require("./config/db");

const port = process.env.PORT || 6060;

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  db();
  console.log(`server is listening on ${port}`);
});
