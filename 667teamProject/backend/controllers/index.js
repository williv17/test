const express = require('express');
const controllerRouter = express.Router();

const registerController = require('./registerController.js');

controllerRouter.get('/register/test', registerController.test);
controllerRouter.post('/register', registerController.registerUser);

module.exports = controllerRouter;