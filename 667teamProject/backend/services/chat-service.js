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
    try {
      const message = await db.MESSAGE.findAll({
        where: {
          game_id: gameId,
        },
        limit: 10,
        order: [['id', 'DESC']],
      });
      return message;
    } catch (error) {
      console.log(error);
    }
  },
}

module.exports = ChatService;