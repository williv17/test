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

const getGameMessageList = async (request, response, next) => {
  const game_id = request.url.split('/')[2];

  const game_message_list = await ChatService.getGameMessageList(
    request.app.get('db'),
    game_id
  )
    .then((db_game_message_list) => {
      if (!db_game_message_list) {
        return response.status(400).json({
          error: { message: 'game_message_list not found' },
        });
      }
      response.db_game_message_list = JSON.stringify(db_game_message_list);
      return response.status(201).json(db_game_message_list);
    })
    .catch(next);

  return game_message_list;
};

module.exports = {
  getLobbyMessageList,
  getGameMessageList,
};