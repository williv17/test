'use strict';

const secrets = [
  'password',
  'emailVerificationToken',
  'status',
  'createdAt',
  'updatedAt',
  'deletedAt',
];

const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authToken: {
        type: DataTypes.STRING,
        defaultValue: '',
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

  User.associate = function (models) {
    User.hasMany(models.Message, {
      foreignKey: 'user_id'
    });

    User.hasOne(models.Game_User, {
      foreignKey: 'user_id'
    });
  };

  return User;
};