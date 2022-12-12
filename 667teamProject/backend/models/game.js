'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.hasMany(models.Game_User, {
        foreignKey: 'user_id',
      });
    }
  }
  Game.init(
    {
      gameName: {
        type: DataTypes.STRING,
      },
      gamePassword: {
        type: DataTypes.STRING,
      },
      gameHost: {
        type: DataTypes.STRING,
      },
      gameHostId: {
        type: DataTypes.INTEGER,
      },
      maxPlayers: {
        type: DataTypes.INTEGER,
      },
      gameStatus: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Game',
    }
  );
  return Game;
};
