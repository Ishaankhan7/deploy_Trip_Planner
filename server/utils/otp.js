const crypto = require('crypto');

exports.generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};