var express = require('express');
const mainRouter = express.Router();

const controllerRouter = require('../controllers/index.js');
const rulesRouter = require('./rules.js');
const homeRouter = require('./home.js');
const loginRouter = require('./login.js');
const registerRouter = require('./register.js');
const lobbyRouter = require('./lobby.js');

/* GET home page. */

mainRouter.use('/', homeRouter);
mainRouter.use('/rules', rulesRouter);
mainRouter.use('/api', controllerRouter);
mainRouter.use('/login', loginRouter);
mainRouter.use('/register', registerRouter);
mainRouter.use('/lobby', lobbyRouter);

module.exports = mainRouter;
