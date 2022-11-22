var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(request, response, next) {
  const {id} = request.params; 


  response.render("private_screens/game", { id});
});
router.get('/:id/:message', function(request, response, next) {
  const {id, message} = request.params; 


  response.render('private_screens/game', { id, message });
});



module.exports = router;



