'use strict';

require('dotenv').config();
const Sequelize = require('sequelize');


let sequelize = null;

exports.Connect = () => {
  if (sequelize === null) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
    });
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
    USER: require('../models/user2'),
    GAME: require('../models/game2'),
    GAME: require('../models/Game-Card'),
    GAME: require('../models/Game-Stat'),
    GAME: require('../models/Game-User'),
    GAME: require('../models/1'),
    GAME: require('../models/game2'),
    SEQUELIZE: Sequelize,
  };

  return DB;
};
