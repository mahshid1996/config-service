const jwt = require('jsonwebtoken');
const logger = require('../../logger.js');
const config = require('config');

module.exports.generateJWTtoken = function (user) {
  return new Promise(function (resolve, reject) {
    const t0 = new Date();
    jwt.sign({ user }, config.jwt.secret, (err, token) => {
      if (err) {
        logger.applog('error', t0, 'Token generation error '+err);
        resolve(err);
      } else {
        logger.applog('info', t0, 'Token generated ' +token)
        resolve(token);
      }
    });
});
}
