const express = require('express');
const controllerRouter = express.Router();
const userController = require('./userController.js');

controllerRouter.post('/register', userController.registerUser);
controllerRouter.post('/login', userController.loginUser);
controllerRouter.get('/logout', function (request, response, next) {
  response.clearCookie('jwt');
  response.redirect('/');
});

controllerRouter.get('/user', function (request, response, next) {
  userController.getUserWithAccessToken(request, response, next);
});

module.exports = controllerRouter;