var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render("public/index");
});


router.get('/login', function(request, response, next) {
  response.render("public/login");
});

router.get('/register', function(request, response, next) {
  response.render("public/register");
});


module.exports = router;



