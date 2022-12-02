'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game_Stat extends Model {
    static associate(models) {
      Game_Stat.belongsTo(models.Game_User);
    }
  }
  Game_Stat.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wins: {
        type: DataTypes.INTEGER,
      },
      losses: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Game_Stat',
    }
  );
  return Game_Stat;
};