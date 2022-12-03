var express = require('express');
const mainRouter = express.Router();

const controllerRouter = require('../controllers/index.js');
const registerRouter = require('./register.js');
const loginRouter = require('./login.js');
const rulesRouter = require('./rules.js');

/* GET home page. */

mainRouter.get('/', function (request, response, next) {
  response.render('public_views/index', { error: false });
});

mainRouter.use('/register', registerRouter);
mainRouter.use('/login', loginRouter);

mainRouter.use('/rules', rulesRouter);
mainRouter.use('/api', controllerRouter);

module.exports = mainRouter;



