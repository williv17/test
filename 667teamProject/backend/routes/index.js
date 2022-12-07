var express = require('express');
const mainRouter = express.Router();

const controllerRouter = require('../controllers/index.js');
const registerRouter = require('./register.js');
const loginRouter = require('./login.js');
const rulesRouter = require('./rules.js');
const homeRouter = require('./home.js');
const logoutRouter = require('./logout.js');

/* GET home page. */

mainRouter.use('/', homeRouter);
mainRouter.use('/register', registerRouter);
mainRouter.use('/login', loginRouter);
mainRouter.use('/rules', rulesRouter);
mainRouter.use('/api', controllerRouter);
mainRouter.use('/logout', logoutRouter);

module.exports = mainRouter;
