'use strict';

module.exports = (sequelize, DataTypes) => {
  const Game_Card = sequelize.define('game_card', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      timestamps: true,
    }
  );

  Game_Card.associate = (models) => {
    Game_Card.belongsTo(models.Card);
    Game_Card.belongsTo(models.Game_User);
    Game_Card.belongsTo(models.Game);
  };

  return Game_Card;
};