require('dotenv').config();
const pgp = require('pg-promise')();

console.log(process.env.DATABASE_URL);

const db = pgp(process.env.DATABASE_URL);



module.exports = db;
