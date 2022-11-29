"use strict";

const Sequelize = require("sequelize");

const Config = require("../config/config")[process.env.NODE_ENV];

let sequelize = null;

exports.Connect = () => {
  if (sequelize === null) {
    sequelize = new Sequelize(Config.database, Config.username, Config.password, {
      ...Config,
      logging: process.env.NODE_ENV === "production" ? false : console.log,
    });
  }

  console.log("Environment: " + process.env.NODE_ENV);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection to database successfull");
    })
    .catch(err => {
      console.log("Unable to connect to the database", err);
    });

  const DB = {
    USER: sequelize.import("../models/User"),
    CARD: sequelize.import("../models/Card"),

    SEQUELIZE: Sequelize,
  };

  // User and Card association
  DB.USER.hasMany(DB.CARD, {
    foreignKey: "user_id",
    sourceKey: "id",
  });
  DB.CARD.belongsTo(DB.USER, {
    foreignKey: "user_id",
    sourceKey: "id",
  });

  return DB;
};