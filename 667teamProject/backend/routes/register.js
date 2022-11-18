// var register =function(user,password){
//     console.log(user,password)
//         if(user==="admin@admin.com" && password==="admin"){
//             return true;
//         }
//         else{
//             return false;
//         }
//     }

//     module.exports= register;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(request, response, next) {
    response.render("public/index",  { error: false });
});




module.exports = router;