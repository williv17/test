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
  async getGameMessageList(db, gameId) {
  return await db.MESSAGE.findAll({
    where: {
      game_id: gameId,
    },
  });
  },
}

module.exports = ChatService;