var express = require('express');
var router = express.Router();
const db = require('../db/server'); //import db/index.js

router.get("/", (request, response) => {
  db.any(
      `INSERT INTO test_table ("testString") VALUES ('Hello at ${Date.now()}')`
      )
    .then( (_) => db.any(`SELECT * FROM test_table`) )
    .then( (results) => response.json({results} ) )
    //.then( (results) => response.render("public/tests", {results} ) )
    .catch( (error) => {
      console.log( error );
      response.json({ error });
    });
});
module.exports = router; //in router making db req