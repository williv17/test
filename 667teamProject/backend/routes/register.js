var express = require('express');
var registerRouter = express.Router();
const registerController = require('../controllers/registerController.js');

registerRouter.get('/', function (request, response, next) {
  response.render('public_views/register', { error: false });
});

registerRouter.post('/', registerController.registerUser);


module.exports = registerRouter;