const UserService = require('../services/user-service');
const AuthService = require('../services/auth/auth-service.js');

const registerUser = async (req, res, next) => {
  const { password, username, email } = req.body;
  // console.log(req.body);
  for (const field of ['email', 'username', 'password'])
    if (!req.body[field]) return res.status(400).send('missing field');

  await UserService.getUserWithEmail(req.app.get('db'), email)
    .then(async (hasUserWithEmail) => {
      if (hasUserWithEmail) {
        return res.status(400).send('username already taken');
      }

      await UserService.hashPassword(password).then(async (hashedPassword) => {
        const newUser = {
          username,
          password: hashedPassword,
          email,
        };

        await UserService.insertUser(req.app.get('db'), newUser).then(
          (user) => {
            if (user) {
              let token = AuthService.createJwt({
                sub: user.id,
                username: user.username,
                email: user.email,
              });

              return res
                .cookie(
                  'jwt',
                  token,
                  {
                    httpOnly: true,
                    path: '/',
                  },
                  { maxAge: 1000 * 60 * 60 * 24 * 7 },
                  { secure: true }
                )
                .status(201)
                .send({ token });
            } else {
              return res.status(400).send('register failed');
            }
          }
        );
      });
    })
    .catch(next);
};

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;
  for (const field of ['email', 'password'])
    if (!req.body[field]) return res.status(400).send('missing field');

  await UserService.getUserWithEmail(req.app.get('db'), email)
    .then(async (user) => {
      if (!user) {
        return res.status(400).send('invalid email or password');
      }
      
      await AuthService.comparePasswords(password, user.password).then(
        (passwordsMatch) => {
          if (!passwordsMatch) {
            return res.status(400).send('invalid email or password');
          }

          let token = AuthService.createJwt({
            sub: user.id,
            username: user.username,
            email: user.email,
          });

          return res
            .cookie(
              'jwt',
              token,
              {
                httpOnly: true,
                path: '/',
              },
              { maxAge: 1000 * 60 * 60 * 24 * 7 },
              { secure: true }
            )
            .status(201)
            .send({ token });
        }
      );
    })
    .catch(next);
};


const getUserWithAccessToken = async (req, res, next) => {
  let access_token;
  if(req.cookies.jwt) {
    access_token = req.cookies.jwt;
  } else {
    return res.status(401).json({ error: 'Unauthorized request' });
  }

  try {
    const payload = AuthService.verifyJwt(access_token);

    await UserService.getUserWithId(req.app.get('db'), payload.sub).then(
      (user) => {
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized request' });
        }
        return res.status(200).send(user);
      }
    );
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserWithAccessToken,
};
