//
// Module Dependencies
//
var express = require('express');
var gameRouter = express.Router();
const gameController = require('../controllers/gameController.js');

/* GET home page. */
// 
// Game page with messaging
gameRouter.get('/:id', gameController.renderGame);

gameRouter.get('/:id/:message', function (request, response, next) {
  const { id, message } = request.params;

  response.render('private_views/game', { id, message });
});

gameRouter.get('/', function (request, response, next) {
  response.render('public_views/game.handlebars');
});

module.exports = gameRouter;
