const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRES_IN, JWT_SECRET } = require('../../config/config');
const User = require('../../models/user');
const UserService = require('../user-service');

const AuthService = {
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },

  createJwt(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    });
  },

  verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },

  parseBasicToken(token) {
    return Buffer.from(token, 'base64').toString().split(':');
  },

  async requireAuth(req, res, next) {
    const authToken = req.cookies.jwt;

    if (!authToken) {
      return res.status(401).redirect('/login');
    }

    try {
      const payload = AuthService.verifyJwt(authToken);
      const id = payload.sub;
      await UserService.getUserWithId(req.app.get('db'), id)
      .then((user) => {
        if (!user) {
          return res.status(401).redirect('/login');
        }
        req.user = { id: user.id, username: user.username, email: user.email}
        next();
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
    } catch (error) {
      console.error(error);
      res.status(401).redirect('/login');
    }
  },
};

module.exports = AuthService;
