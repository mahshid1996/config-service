// checkPermission.js
const config = require('config');
const jwt = require('jsonwebtoken');

async function checkPermission(authorization) {
    const token = authorization.replace('Bearer ', '');
    // Replace with your actual secret key
    const secret = config.authentication.secret;
    const decodedToken = jwt.verify(token, secret);
    const hasPermission = decodedToken.user === 'admin' ? true : false;
    const permission = decodedToken.permission;
    return [hasPermission,permission];

  }
  
  module.exports = {
    checkPermission
  };
  
  