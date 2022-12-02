const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

const AuthService = {
  getUserWithUserName(db, username) {
    return db.USER.findOne({ where: { username } });
  },

  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },

  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
      expiresIn: config.JWT_EXPIRY,
    });
  },

  // verifyJwt(token) {
  //   return jwt.verify(token, config.JWT_SECRET, {
  //     algorithms: ['HS256'],
  //   });
  // },

  parseBasicToken(token) {
    return Buffer.from(token, 'base64').toString().split(':');
  },

  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, and a number';
    }
    return null;
  },
};

module.exports = AuthService;
