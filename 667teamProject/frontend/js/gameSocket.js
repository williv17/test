let game_socket = io("localhost:3000");

async function getUser() {
  const user = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());

  return { username: user.username, id: user.id };
}

async function getGame(game_id) {
  const game = await fetch(`/api/game/${game_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());

  return game;
}

async function getGameUserCount(game_id) {
  const count = await fetch(`/api/game-count/${game_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());

  return count;
}

async function createGameUser(game_id, user) {
  console.log(user);
  const game_user = await fetch('/api/game-user', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      game_id: game_id,
      user_id: user.id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
  return game_user;
}

async function getGameUser(game_id, user_id) {
  const url = `/api/game-user/${game_id}/${user_id}`;
  const game_user = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => {
      if (res.status == 400) {
        return null;
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      console.log('data above');
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return game_user;
}

const user = getUser()
  .then((user) => {
    console.log(user);
    const game_id = window.location.pathname.split('/')[2];
    console.log(game_id);
    getGameUser(game_id, user.id)
      .then((game_user) => {
        if (game_user == null) {
          getGame(game_id)
            .then((game) => {
              if (game == null) {
                console.log('Game is null');
                return;
              }
              const max_players = game.maxPlayers;
              getGameUserCount(game_id)
                .then((count) => {
                  if (count < max_players) {
                    createGameUser(game_id, user)
                      .then((game_user) => {
                        game_socket.emit('game-join', user, game_id);
                        return game_user;
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    console.log('Game is full');
                    window.location.href = '/lobby';
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log('Game user exists');
          game_socket.emit('game-join', user, game_id);
          return game_user;
        }
      })
      .catch((err) => {
        console.log('Error in getGameUser');
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });


game_socket.on('game-user-connected', (user) => {
  console.log(`${user.username} connected`);
});

game_socket.on('game-leave', (user) => {
  console.log(`${user.username} disconnected`);
});

game_socket.on('game-message', (data) => {
  console.log(`${data.name}: ${data.message}`);
});

game_socket.on('game-start', (data) => {
  console.log(`${data.name}: ${data.message}`);
});

game_socket.on('game-end', (data) => {
  console.log(`${data.name}: ${data.message}`);
});

game_socket.on('game-ready', (game) => {
  console.log("Game is ready");
  console.log(game);
  user
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    }
  );
});
