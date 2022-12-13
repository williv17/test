//
// Module Dependencies
//
const handlebar_service = require('../services/handlebar-service');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const GameService = require('../services/game-service');


// export to routes/games.js logic
const renderGame = (request, response) => {
  const game_id = request.params.id;
  const game = GameService.getGame(request.app.get('db'), game_id)
    .then((game) => {
      if(!game) {
        return response.status(400).redirect('/lobby');
      } else {
        let user;
        let access_token;

        if (request.user) {
          user = request.user;
        }

        if (request.cookies) {
          access_token = request.cookies['jwt'];
        }

        response.user = user;
        response.access_token = access_token;
        response.game_state = game.gameStatus;


        const game_view_temp_str = fs.readFileSync(
          path.join(
            __dirname,
            '../../frontend/views/private_views/game.handlebars'
          ),
          'utf8'
        );

        Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
          return arg1 == arg2 ? options.fn(this) : options.inverse(this);
        });

        const game_template = Handlebars.compile(game_view_temp_str);
        const html = game_template({
          game_state : game.gameStatus,
        });

        handlebar_service.renderPage(
          response,
          '../../frontend/views/layout/lobby.handlebars',
          html
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const createGame = async (request, response, next) => {
  const game = request.body;
  console.log(game);
  console.log("creating game...");
  const newGame = {
    gameName: game.gameName,
    gamePassword: game.gamePassword,
    gameHost: game.gameHost,
    gameHostId: game.gameHostId,
    maxPlayers: game.maxPlayers,
    gameStatus: 'waiting',
  };

  await GameService.insertGame(request.app.get('db'), newGame)
    .then((game) => {
      if (!game) {
        return response.status(400).json({
          error: { message: 'game not created' },
        });
      }
      return response.status(201).send(game);
    })
    .catch(next);
};

const createGameUser = async (request, response, next) => {
  const new_game_user = {
    game_id: request.body.game_id,
    user_id: request.body.user_id,
  };

  await GameService.insertGameUser(request.app.get('db'), new_game_user)
    .then((game_user) => {
      if (!game_user) {
        return response.status(400).json({
          error: { message: 'game_user not created' },
        });
      }
      response.game_user = JSON.stringify(game_user);
      return response.status(201).json(game_user);
    })
    .catch(next);
};

const getGameUser = async (request, response, next) => {
  const user = {
    game_id: request.url.split('/')[2],
    user_id: request.url.split('/')[3],
  };


  const game_user = await GameService.getGameUser(request.app.get('db'), user)
    .then((db_game_user) => {
      if (!db_game_user) {
        return response.status(400).json({
          error: { message: 'game_user not found' },
        });
      }
      response.db_game_user = JSON.stringify(db_game_user);
      return response.status(201).json(db_game_user);
    })
    .catch(next);

  return game_user;
};

const getGameCount = async (request, response, next) => {
  const game_id = request.url.split('/')[2];

  const game_count = await GameService.getGameCount(request.app.get('db'), game_id)
    .then((db_game_count) => {
      if (!db_game_count) {
        return response.status(400).json({
          error: { message: 'game_count not found' },
        });
      }
      response.db_game_count = JSON.stringify(db_game_count);
      return response.status(201).json(db_game_count);
    })
    .catch(next);

  return game_count;
};

const getGame = async (request, response, next) => {
  const game_id = request.url.split('/')[2];

  const game = await GameService.getGame(request.app.get('db'), game_id)
    .then((db_game) => {
      if (!db_game) {
        return response.status(400).json({
          error: { message: 'game not found' },
        });
      }
      response.db_game = JSON.stringify(db_game);
      return response.status(201).json(db_game);
    })
    .catch(next);

  return game;
};

const getLobbyGameList = async (request, response, next) => {
  const game_list = await GameService.getLobbyGameList(request.app.get('db'))
    .then((db_game_list) => {
      if (!db_game_list) {
        return response.status(400).json({
          error: { message: 'game_list not found' },
        });
      }
      response.db_game_list = JSON.stringify(db_game_list);
      return response.status(201).json(db_game_list);
    })
    .catch(next);

  return game_list;
};

const getGameId = async (request, response, next) => {
  const game = {
    gameHostId: request.url.split('/')[2],
    gameName: request.url.split('/')[3],
  };
  const game_id = await GameService.getGameId(request.app.get('db'), game)
    .then((db_game_id) => {
      if (!db_game_id) {
        return response.status(400).json({
          error: { message: 'game_id not found' },
        });
      }
      response.db_game_id = JSON.stringify(db_game_id);
      return response.status(201).json(db_game_id);
    })
    .catch(next);
    
  return game_id;
};

//
// export modules
//

module.exports = {
  createGame,
  renderGame,
  createGameUser,
  getGameUser,
  getGame,
  getGameCount,
  getLobbyGameList,
  getGameId,
};
