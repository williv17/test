//
// Module Dependencies
//
var express = require('express');
var loginRouter = express.Router();

//
// Login Page - .get handlebars from 'public_views'
//
loginRouter.get('/', function (request, response, next) {
  response.render('public_views/login', { error: false });
});

module.exports = loginRouter;
