//
// Module Dependencies
//
var express = require('express');
var registerRouter = express.Router();

//
// Regitstration Page - .get handlebars from 'public_views'
//
registerRouter.get('/', function (request, response, next) {
  response.render('public_views/register', { error: false });
});

module.exports = registerRouter;
