const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

const register = require('/public/register');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
/* Login user */
router.post('/register', jsonBodyParser, (req, res, next) => {
  const { name, email, password } = req.body.username;

  for (const field of ['name', 'email', 'password']) {
    if (!req.body[field])
      return res.render('public_views/index', {
        error: `Missing '${field}' in request body`,
      });
  }
  const passwordError = UsersService.validatePassword(password);
  if (passwordError) return res.render('public_views/index', { error: passwordError });
  
});

router.post('/login', jsonBodyParser, (req, res, next) => {
  const { user_name, password } = req.body;
  const loginUser = { user_name, password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.render('public_views/index', {
        error: `Missing '${key}' in request body`,
      });

  AuthService.getUserWithUserName(req.app.get('db'), loginUser.user_name)
    .then((dbUser) => {
      if (!dbUser)
        return res.render('public_views/index', {
          error: 'Incorrect user_name or password',
        });

      return AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      ).then((compareMatch) => {
        if (!compareMatch)
          return res.render('public_views/index', {
            error: 'Incorrect user_name or password',
          });

        const sub = dbUser.user_name;
        const payload = { user_id: dbUser.id };
        res.send({
          authToken: AuthService.createJwt(sub, payload),
        });
      });
    })
    .catch(next);
});

module.exports = router;
