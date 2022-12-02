'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  class Message extends Model {
    static associate(models) {
      message.belongsTo(models.User)
    }
  }

  Message.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      game_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      context: {
        type: DataTypes.STRING,
        allowNull: false,
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
      name: 'Message',
      timestamps: true,
      paranoid: true,
    }
  );
};