const express = require('express');
const controllerRouter = express.Router();
const userController = require('./userController.js');
const gameController = require('./gameController.js');
const messageController = require('./messageController.js');

controllerRouter.post('/register', userController.registerUser);
controllerRouter.post('/login', userController.loginUser);
controllerRouter.get('/logout', function (request, response, next) {
  response.clearCookie('jwt');
  response.redirect('/');
});

controllerRouter.get('/user', function (request, response, next) {
  userController.getUserWithAccessToken(request, response, next);
});
controllerRouter.post('/game', gameController.createGame);
controllerRouter.post('/game-user', gameController.createGameUser);
controllerRouter.get('/game-user/:game_id/:user_id', gameController.getGameUser);
controllerRouter.get('/game/:game_id', gameController.getGame);
controllerRouter.get('/game-count/:game_id', gameController.getGameCount);
controllerRouter.get('/lobby-message-list', messageController.getLobbyMessageList);
controllerRouter.get('/lobby-game-list', gameController.getLobbyGameList);
controllerRouter.get('/game/:game_host/:game_host_id', gameController.getGameId);

module.exports = controllerRouter;