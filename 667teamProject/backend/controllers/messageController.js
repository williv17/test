const ChatService = require('../services/chat-service');

const getLobbyMessageList = async (request, response, next) => {
  const lobby_message_list = await ChatService.getLobbyMessageList(
    request.app.get('db')
  )
    .then((db_lobby_message_list) => {
      if (!db_lobby_message_list) {
        return response.status(400).json({
          error: { message: 'lobby_message_list not found' },
        });
      }
      response.db_lobby_message_list = JSON.stringify(db_lobby_message_list);
      return response.status(201).json(db_lobby_message_list);
    })
    .catch(next);

  return lobby_message_list;
};

module.exports = {
  getLobbyMessageList,
};