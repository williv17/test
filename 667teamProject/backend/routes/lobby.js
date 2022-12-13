//
// Module Dependencies
//
var express = require('express');
var lobbyRouter = express.Router();
const lobbyController = require('../controllers/lobbyController.js');
const AuthService = require('../services/auth/auth-service');

//
// Lobby Page
//
lobbyRouter.get('/', AuthService.requireAuth, lobbyController.renderLobby);


module.exports = lobbyRouter;



