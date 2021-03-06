const helper = require("./helper");

/**
 * authController namespace.
 * @namespace authController
 */

 /**
 * @desc Handler method for the 'signup' endpoint. Calls the 'signUp' helper function to add user data
 * to the db data store
 * @memberof authController
 * @param {string} user username of the new user taken from request body
 * @param {string} email email of the new user taken from request body
 * @param {string} password password of the new user taken from request body
 * @returns {User} On success, returns a 200 and the correct user JSON object. On error, returns a 500
 */
export const signUp = (req, res) => {
  console.log("====================================");
  console.log(req.body);
  console.log("=================controller===================");
  const { user, email, password } = req.body;
  helper
    .signUp(user, email, password)
    .then(result => {
      res.status(200).json(result);

    })
    .catch(err => {
      res.status(500).json(err);
    });
};

 /**
 * @desc Handler method for the 'login' endpoint. Calls the 'login' helper function to add user data
 * to the db data store
 * @memberof authController
 * @param {string} email email of the new user taken from request body
 * @param {string} password password of the new user taken from request body
 * @returns {User} On success, returns a 200 and a User object. On error, returns a 
 *  404 not found or 500 depending on the error
 */
export const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log("====================================");
  console.log(req.body);
  console.log("=================controller===================");
  helper
    .login(email, password)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      if (err === "NOT FOUND") {
        res.status(404).json(err);
      } else {
        res.status(500).json(err);
      }
    });
};
