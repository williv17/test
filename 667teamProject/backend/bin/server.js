#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('667teamproject:server');
var http = require('http');
const Database = require('../models');
const db = Database.Connect();
const socket = require('socket.io');
const users = {};
const game_users = {};
const client_rooms = {};




/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('db', db); 

/**
 * Create HTTP server.
 */

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
var io = socket(server);

io.on('connection', function(socket) {
  console.log("A user connected");
  socket.on('disconnect', function() {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
  socket.on('send-chat-message', (message) => {
    const user = users[socket.id];
    const new_message = {
      context: message,
      user_id: user.id,
      user_name: user.username,
    };
    db.MESSAGE.create(new_message)
      .then((message) => {
        console.log('Message created');
        socket.broadcast.emit('chat-message', {
          message: message,
          name: users[socket.id].username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('lobby-join', (user) => {
    users[socket.id] = user;
    socket.broadcast.emit('user-connected', user);
  }
  );

  socket.on('game-join', (user, game_id) => {
    console.log('Game join');
    const game_user_count = db.GAME_USER.count({
      where: {
        game_id: game_id,
      },
    });
    const game = db.GAME.findOne({
      where: {
        id: game_id,
      },
    })
    .then((game) => {
      game_user_count
      .then((game_user_count) => {    
        if (game_user_count === game.maxPlayers) {
          console.log('Game is full');
          game.set({
            gameStatus: 'ready',
          });
          game.save();
          socket.emit('game-ready', game);
        } else {
          console.log('Game is not full');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    game_users[socket.id] = user;
    socket.broadcast.emit('game-user-connected', user);
    }
    )
    .catch((err) => {
      console.log(err);
    });
  }
  );

  socket.on('game-created', (game) => {
    console.log('Game create');
    socket.emit('update-game-list');
  }
  );

  socket.on('game-leave', (user) => {
    socket.broadcast.emit('game-user-disconnected', user);
  }
  );

  socket.on('game-start', (user) => {
    socket.broadcast.emit('game-start', user);
  }
  );
  socket.on('game-end', (user) => {
    socket.broadcast.emit('game-end', user);
  }
  );
  
});
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
