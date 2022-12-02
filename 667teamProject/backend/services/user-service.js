const xss = require('xss');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
const bcrypt = require('bcryptjs');


const UsersService = {
  getUserWithUserName(db, username) {
    return db.USER.findOne({ where: { username } });
  },

  insertUser(db, newUser) {
    return db.USER.create(newUser);
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
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

  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
      password: xss(user.password),
      email: xss(user.email),
    };
  },
};

module.exports = UsersService;
