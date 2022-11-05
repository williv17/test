var express = require('express');
var router = express.Router();
var register= require('/public/register');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/* Login user */
router.post('/register', function (req, res, next) {
const username = req.body.username;
    let regResult = register(username, req.body.password);
if (regResult) {
        res.render('/users', {username: username});
    }
    else {
        res.render('/index', {error: true});
    }
});
module.exports = router;