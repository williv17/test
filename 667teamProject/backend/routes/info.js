var express = require('express');
var infoRouter = express.Router();

infoRouter.get('/', function (request, response, next) {
  response.render('public_views/info', { error: false });
});

module.exports = infoRouter;
