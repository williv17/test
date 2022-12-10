var express = require('express');
var gameRouter = express.Router();

gameRouter.get('/', function (request, response, next) {
  response.render('public_views/game', { error: false });
});

module.exports = gameRouter;
