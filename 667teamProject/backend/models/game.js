'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  class Game_Card extends Model {
    static associate(models) {
      game.hasMany(models.Game_User, {
        foreignKey: 'user_id'
    });
    }
  }

  Game_Card.init(
    {
      game_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      name: 'Game',
      timestamps: true,
    }
  );
};