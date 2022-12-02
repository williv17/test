var express = require('express');
var rulesRouter = express.Router();

rulesRouter.get('/', function(request, response, next) {
  response.render('public_views/rules');
});

module.exports = rulesRouter;