//
// find all messages from database
//
const ChatService = {
  async getLobbyMessageList(db) {
    return await db.MESSAGE.findAll({
      where: {
        game_id: null,
      },
      limit: 10,
      order: [['id', 'DESC']],
    });
  },
  //
  // get message list where gameID = gameID
  //
  async getGameMessageList(db, gameId) {
  return await db.MESSAGE.findAll({
    where: {
      game_id: gameId,
    },
  });
  },
}

module.exports = ChatService;