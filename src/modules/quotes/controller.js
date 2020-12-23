const helper = require("./helper");

/**
 * quoteController namespace.
 * @namespace quoteController
 */

/**
 * @desc Handler method for the 'getAll' endpoint. Calls the 'getQuotes' helper function to query the db
 * and return quote data
 * @memberof quoteController
 * @returns {Quotes} On a successful response, returns a 200 and array of quote objects. On error, 
 * returns a 500
 */
export const getQuotes = (req, res) => {

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

/**
 * @desc Handler method for the 'fetchNew' endpoint. Calls the 'fetchNewQuotes' helper function to query the db
 * and return quote data
 * @memberof quoteController
 * @param {string} author Name of a quote's author passed as a string in the request body
 * @returns {Quotes} On a successful response returns a 200 and array of quote objects. On error, 
 * returns a 500
 */
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

/**
 * @desc Handler method for the 'fetchOne' endpoint. Calls the 'fetchAQuote' helper function to query the db
 * and return quote data
 * @memberof quoteController
 * @param {string} author Name of a quote's author passed as a string in the request body
 * @returns {Quotes} On a successful response, returns a 200 and quote object. On error, returns a 500
 */
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
