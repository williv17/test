//
// create and return a newGame 
//
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

  //
  // Look for new users to the game and add them to a new game
  //
  async getGameUser(db, gameUser) {
    const { game_id, user_id } = gameUser;
    return await db.GAME_USER.findOne({
      where: {
        game_id: game_id,
        user_id: user_id,
      },
    });
  },

  //
  // Look for new games and assign them a gaemID
  //
  async getGame(db, gameId) {
    return await db.GAME.findOne({
      where: {
        id: gameId,
      },
    });
  },
  
  //
  // Get the game count
  //
  async getGameCount(db, gameId) {
    return await db.GAME_USER.count({
      where: {
        game_id: gameId,
      },
    });
  },
//
//  Get a list of all the Games
//
  async getLobbyGameList(db) {
    return await db.GAME.findAll({
      where: {
        gameStatus: 'waiting',
      },
    });
  },

  // find GameID of all games
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