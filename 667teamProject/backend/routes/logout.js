var express = require('express');
var logoutRouter = express.Router();

logoutRouter.get('/', function (request, response, next) {
  response.clearCookie('jwt');
  response.redirect('/');
});

module.exports = logoutRouter;
