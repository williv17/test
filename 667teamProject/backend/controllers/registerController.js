const path = require('path');
const models = require('../models');

const UsersService = require(path.join(__dirname, '../services/user-service'));

const registerUser = async (req, res) => {
  console.log(typeof models.User);
  try {
    const newUser = await models.User.create(req.body);
    return res.status(201).json({ 
      newUser,
     });
    // if (hasUserWithUserName)
    //   return res.status(400).json({ error: 'Username already taken' });

    // const hashedPassword = await UsersService.hashPassword(password);

    // const newUser = {
    //   name,
    //   email,
    //   password: hashedPassword,
    // };

    // const user = await UsersService.insertUser(req.app.get('db'), newUser);

    // res.status(201).json(UsersService.serializeUser(user));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const test = async (req, res, next) => {
  console.log('test');
  res.status(200).json({ message: 'test' });
};

module.exports = {
  registerUser,
  test,
};
