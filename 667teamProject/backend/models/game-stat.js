'use strict';

module.exports = (sequelize, DataTypes) => {
  class Game_Stat extends Model {
    static associate(models) {
      Game_Stat.belongsTo(models.Game_User);
    }
  }

  Game_Stat.init(
    {
      stat_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wins: {
        type: DataTypes.INTEGER,
      },
      losses: {
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
      name: 'Game_Stat',
      timestamps: true,
    }
  );
};