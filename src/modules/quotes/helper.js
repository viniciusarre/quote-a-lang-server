import Axios from "axios";

const Quotes = require("../../models/Quotes");

/**
 * quoteHelper namespace
 * @namespace quoteHelper
 */

/**
 * @desc Method that retrieves all quotes in the db store
 * @memberof quoteHelper
 * @returns {Promise} Promise that returns an array of quote data
 */
export const getQuotes = () => {
  return new Promise((resolve, reject) => {
    Quotes.find()
      .then(quotes => {
        if (quotes.length === 0) {
          reject("NOT FOUND");
        } else {
          let result = [];
          quotes.map(q => {
            q.data.map(d => {
              d.quotes.map((f, i) => {
                let current = {
                  author: q.author,
                  flag: q.flag,
                  language: q.language,
                  quote: f,
                  source: d.sources[i]
                };
                result.push(current);
              });
            });
          });

          resolve(result);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * @desc Method that retreives new quotes from a given author in the db store
 * @memberof quoteHelper
 * @param {string} author Name of a quote's author
 * @returns {Promise} Promise that returns an array of quote data
 */
export const fetchNewQuotes = author => {
  const data = {
    author: author
  };

  return new Promise((resolve, reject) => {
    Axios.get(
      `${process.env.CRAWLER_URI}/find/?author=${author}`
    )
      .then(result => {
        if (result.data.success) {
          resolve(result.data);
        } else {
          reject({ success: false });
        }
      })
      .catch(err => {
        reject({ success: false });
      });
  });
};

<<<<<<< HEAD
/**
 * @desc Method that retreives a quote by a given author in the db store
 * @memberof quoteHelper 
 * @param {string} author Name of a quote's author
 * @returns {Promise} Promise that returns a quote
 */
export const fetchAQuote = autor => {
=======
export const fetchAQuote = author => {
>>>>>>> master
  return new Promise((resolve, reject) => {
    Quotes.find({ author })
      .then(result => {
        if (result) {
          resolve(result);
        } else {
          reject("NOT FOUND");
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
