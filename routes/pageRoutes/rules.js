var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/rules', function(request, response, next) {
  response.render("public/rules");
});

module.exports = router;