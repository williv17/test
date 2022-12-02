'use strict';

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    card_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.INTEGER,
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
      timestamps: true,
    }
  );

  Card.associate = (models) => {
    Card.hasOne(models.Game_Card, {
      foreignKey: 'card_id',
    }
  )};

  return Card;
};