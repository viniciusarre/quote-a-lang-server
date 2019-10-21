const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || 'secret';
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
  const token = jwt.sign({ email }, secret);

  return new Promise((resolve, reject) => {
    const newUser = new User({
      user,
      email,
      password,
      token
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

/**
 * @desc Validate authentication token
 * @memberof authHelper
 * @param {object} request
 * @param {object} response
 * @param {*} next
 * @returns {*} json or next
 */
export const verifyToken = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }
  const bearerToken = token.split(' ')[1];
  return jwt.verify(bearerToken || token, secret, (error, decoded) => {
    if (error) {
      return res.status(400).json(error);
    }
    req.email = decoded.email;
  });
}
