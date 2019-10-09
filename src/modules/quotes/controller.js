const helper = require("./helper");

export const getQuotes = (req, res) => {
  console.log("====================================");
  console.log(req.body);
  console.log("=================controller===================");

  //    console.log("BODY >> ", req.body);
  helper
    .getQuotes()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

export const fetchNew = (req, res) => {
  console.log("====================================");
  console.log(req.body);
  console.log("=================controller===================");
  const { author } = req.body;
  helper
    .fetchNewQuotes(author)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

export const fetchOne = (req, res) => {
  console.log("====================================");
  console.log(req.body);
  console.log("=================controller===================");
  const { author } = req.body;
  helper
    .fetchAQuote(author)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
