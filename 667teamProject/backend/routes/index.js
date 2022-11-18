var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(request, response, next) {
  response.render("public/index",  { error: false });
});


router.get('/login', function(request, response, next) {
  response.render("public/login");
});

router.get('/register', function(request, response, next) {
  response.render("public/register");
});


router.get('/rules', function(request, response, next) {
  response.render("public/rules");
});

module.exports = router;



