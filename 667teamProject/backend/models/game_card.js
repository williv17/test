'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game_Card extends Model {
    static associate(models) {
      Game_Card.belongsTo(models.Card);
      Game_Card.belongsTo(models.Game_User);
      Game_Card.belongsTo(models.Game);
    }
  }
  Game_Card.init(
    {
      game_id: {
        type: DataTypes.INTEGER,
      },
      card_id: {
        type: DataTypes.INTEGER,
      },
      discarded: {
        type: DataTypes.BOOLEAN,
      },
      in_deck: {
        type: DataTypes.BOOLEAN,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      order_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Game_Card',
    }
  );
  return Game_Card;
};