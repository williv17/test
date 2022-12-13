//
// Module Dependencies
//
var express = require('express');
var rulesRouter = express.Router();

//
// Rules Page - .get hancldebards from 'public_views'
//
rulesRouter.get('/', function(request, response, next) {
  let access_token;
  if (request.cookies) {
    access_token = request.cookies['jwt'];
  }

  response.render('public_views/rules', { access_token: access_token });
});

module.exports = rulesRouter;