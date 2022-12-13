const Sequelize = require('sequelize');
const envConfigs = require('../config/config');
let sequelize = null;


exports.Connect = () => {
  if (sequelize === null) {
    sequelize = new Sequelize(envConfigs.development.url, {
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
    USER: require('../models/user')(sequelize, Sequelize),
    GAME: require('../models/game')(sequelize, Sequelize),
    GAME_USER: require('../models/game_user')(sequelize, Sequelize),
    GAME_CARD: require('../models/game_card')(sequelize, Sequelize),
    CARD: require('./card')(sequelize, Sequelize),
    MESSAGE: require('../models/message')(sequelize, Sequelize),
    sequelize,
    Sequelize,
  };
  return DB;
};
