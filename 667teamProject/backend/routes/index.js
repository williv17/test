var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(request, response, next) {
  response.render("public_views/index",  { error: false });
});


router.get('/login', function(request, response, next) {
  response.render('public_views/login');
});

router.get('/register', function(request, response, next) {
  response.render('public_views/register');
});


router.get('/rules', function(request, response, next) {
  response.render('public_views/rules');
});

module.exports = router;



