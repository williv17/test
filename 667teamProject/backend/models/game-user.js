'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  class Game_User extends Model {
    static associate(models) {
    Game_User.hasMany(models.Game_Card, {
      foreignKey: 'game_user_id'
    });

    Game_User.hasOne(models.Game_Stat, {
      foreignKey: 'game_user_id'
    });    
    }
  }

  Game_User.init(
    {
      game_user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      name: 'Game_User',
      timestamps: true,
    }
  );
};