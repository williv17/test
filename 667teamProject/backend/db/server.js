'use strict';

const Sequelize = require('sequelize');

let sequelize = null;

exports.Connect = () => {
  if (sequelize === null) {
    console.log("Hello");
    sequelize = new Sequelize(process.env.DATABASE_URL);
  }

  console.log('Environment: ' + process.env.NODE_ENV);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection to database successfull');
    })
    .catch((err) => {
      console.log('Unable to connect to the database', err);
    });
  
  const DB = {
    USER: require('../2n/User'),
    GAME: require('../2n/Game'),
    GAME: require('../2n/Game-Card'),
    GAME: require('../2n/Game-Stat'),
    GAME: require('../2n/Game-User'),
    GAME: require('../2n/Message'),
    GAME: require('../2n/Game'),
    SEQUELIZE: Sequelize,
  };

  return DB;
};
