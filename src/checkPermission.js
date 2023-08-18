// checkPermission.js
const config = require('config');
const jwt = require('jsonwebtoken');

  async function checkPermission(authorization) {
    const token = authorization.replace('Bearer ', '');
    // Replace with your actual secret key
    const secret = config.authentication.secret;
    const decodedToken = jwt.verify(token, secret);
    return decodedToken.user === 'admin' ? true : false;

  }
  
  module.exports = {
    checkPermission
  };
  
  