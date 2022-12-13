const { Op } = require("sequelize");

const GameService = {
  async insertGame(db, newGame) {
    return await db.GAME.create(newGame);
  },

  async getGameById(db, gameId) {
    return await db.GAME.findByPk(gameId);
  },

  async insertGameUser(db, newGameUser) {
    return await db.GAME_USER.create(newGameUser);
  },

  async getGameUser(db, gameUser) {
    const { game_id, user_id } = gameUser;
    return await db.GAME_USER.findOne({
      where: {
        game_id: game_id,
        user_id: user_id,
      },
    });
  },

  async getGame(db, gameId) {
    return await db.GAME.findOne({
      where: {
        id: gameId,
      },
    });
  },
  
  async getGameCount(db, gameId) {
    return await db.GAME_USER.count({
      where: {
        game_id: gameId,
      },
    });
  },

  async getGameUserCards(db, game_user) {
    return await db.GAME_CARD.findAll({
      where: {
        game_id: game_user.game_id,
        user_id: game_user.game_user_id,
      },
    });
  },

  async getGameUsersCards(db, game_id) {
    console.log(game_id);
    return await db.GAME_CARD.findAll({
      where: {
        game_id: game_id,
        user_id: {
          [Op.ne]: null,
        }
      },
    });
  },

  async getLobbyGameList(db) {
    return await db.GAME.findAll({
      where: {
        gameStatus: 'waiting',
      },
    });
  },

  async getGameId(db, game) {
    return await db.GAME.findOne({
      where: {
        gameName: game.gameName,
        gameHostId: game.gameHostId,
      },
    });
  },

};

module.exports = GameService;