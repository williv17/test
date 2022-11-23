var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(request, response, next) {
    response.render("public/index",  { error: false });
});




module.exports = router;