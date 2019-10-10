import Axios from "axios";

const Quotes = require("../../models/Quotes");

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

export const fetchAQuote = author => {
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
