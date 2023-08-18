const jwt = require('jsonwebtoken');
const config = require('config');


async function generateAccessToken(context) {

  const secret = config.authentication.secret;
  const accessToken = jwt.sign(context.data, secret, { expiresIn: '1d' });
  context.data.accessToken = accessToken
  return context; 
}

module.exports = {
  generateAccessToken
};
