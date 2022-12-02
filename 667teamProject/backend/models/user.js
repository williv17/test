'use strict';

const secrets = [
  'password',
  'emailVerificationToken',
  'status',
  'createdAt',
  'updatedAt',
  'deletedAt',
];

const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  class User extends Model {
    static associate(models) {
    User.hasMany(models.Message, {
      foreignKey: 'user_id',
    });

    User.hasOne(models.Game_User, {
      foreignKey: 'user_id',
    });
    }
  }

  User.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailVerificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
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
      name: 'User',
      timestamps: true,
      paranoid: true,
    }
  );

  User.prototype.purge = function () {
    const clean = {};
    for (const key of Object.keys(this.dataValues)) {
      if (!secrets.includes(key)) {
        clean[key] = this.dataValues[key];
      }
    }
    return clean;
  };
};