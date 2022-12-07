const express = require('express');
const controllerRouter = express.Router();

const registerController = require('./registerController.js');

controllerRouter.post('/register', registerController.registerUser);

module.exports = controllerRouter;