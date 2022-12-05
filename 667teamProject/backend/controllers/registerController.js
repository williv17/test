const path = require('path');
const Database = require('../models');
const db = Database.Connect();
const User = db.USER;
const UserService = require('../services/user-service');
const AuthService = require('../services/auth/auth-service.js');

const registerUser = async (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const { password, username, email } = req.body;
    for (const field of ['email', 'username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`,
      });

    const passwordError = AuthService.validatePassword(password);

    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UserService.getUserWithUserName(req.app.get('db'), username)
      .then((hasUserWithUserName) => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: 'Username already taken' });

        return UserService.hashPassword(password).then((hashedPassword) => {
          const newUser = {
            username,
            password: hashedPassword,
            email,
          };
          
          return UserService.insertUser(req.app.get('db'), newUser).then(
            (user) => {
              if (user) {
                let token = AuthService.createJwt(user.username, {
                  user_id: user.id,
                });
                console.log('user', JSON.stringify(user, null, 2));
                console.log(token);
                return res
                  .cookie('jwt', token, {
                    httpOnly: true,
                    path: '/',
                  })
                  .status(201)
                  .send(user);
              } else {
                return res.status(400).json({ error: 'Something went wrong' });
              }
            }
          );
        });
      })
      .catch(next);
};



const test = async (req, res, next) => {
  console.log('test');
  res.status(200).json({ message: 'test' });
};

module.exports = {
  registerUser,
  test,
};