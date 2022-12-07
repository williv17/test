const xss = require('xss');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
const bcrypt = require('bcryptjs');


const UsersService = {
  async getUserWithUserName(db, username) {
    return await db.USER.findOne({ where: { username } });
  },

  async getUserWithEmail(db, email) {
    return await db.USER.findOne({ where: { email } });
  },

  async insertUser(db, newUser) {
    return await db.USER.create(newUser);
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
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
