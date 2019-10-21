const User = require("../../models/User");
//make it better

/**
 * authHelper namespace.
 * @namespace authHelper
 */

/**
 * @desc Creates a new user (receives a unique email and a password)
 * @memberof authHelper
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email, password })
      .then(result => {
        if (result === null) {
          reject("NOT FOUND");
        } else {
          resolve(result);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * @desc Signs up a user which has already been created, it receives email and password and returns a promise containing the operation's result
 * @memberof authHelper
 * @param {string} user
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const signUp = (user, email, password) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      user,
      email,
      password
    });
    newUser
      .save()
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        console.log("SIGN UP ERR >> ", err);
        reject(err);
      });
  });
};
