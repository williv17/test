var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(request, response, next) {
  response.render("public_screens/index",  { error: false });
});


router.get('/login', function(request, response, next) {
  response.render('public_screens/login');
});

router.get('/register', function(request, response, next) {
  response.render('public_screens/register');
});


router.get('/rules', function(request, response, next) {
  response.render('public_screens/rules');
});

module.exports = router;



