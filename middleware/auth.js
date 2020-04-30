const jwt = require('jsonwebtoken');
const config= require('config');
const keys = require('../config/keys');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, keys.secretKey);
    req.user = decoded;
    // console.log("auth middleware");
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}