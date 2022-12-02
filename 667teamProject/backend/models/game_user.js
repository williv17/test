'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game_User.hasMany(models.Game_Card, {
        foreignKey: 'game_user_id',
      });

      Game_User.hasOne(models.Game_Stat, {
        foreignKey: 'game_user_id',
      });    
    }
  }
  
  Game_User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      play_order: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Game_User',
    }
  );
  return Game_User;
};