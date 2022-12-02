var express = require('express');
var registerRouter = express.Router();

registerRouter.get('/', function (request, response, next) {
  response.render('public_views/register', { error: false });
});
module.exports = registerRouter;