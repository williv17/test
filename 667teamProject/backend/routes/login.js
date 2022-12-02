var express = require('express');
var loginRouter = express.Router();

loginRouter.get('/', function (request, response, next) {
  response.render('public_views/login');
});

module.exports = loginRouter;
