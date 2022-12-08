const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRES_IN, JWT_SECRET } = require('../../config/config');

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

  requireAuth(req, res, next) {
    const authToken = req.cookies.jwt;

    if (!authToken) {
      return res.status(401).json({ error: 'Missing bearer token' });
    }

    try {
      const payload = verifyJwt(bearerToken);
      const id = payload.sub;

      User.findById;
      User.findOne({ where: { id } })
        .then((user) => {
          if (!user)
            return res.render('error', { error: 'Unauthorized request' });
          req.user = user;
          next();
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } catch (error) {
      res.render('error', { error: 'Unauthorized request' });
    }
  },
};

module.exports = AuthService;
