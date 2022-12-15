let game_socket = io("https://test-1tex.onrender.com/");
const gameChatForm = document.getElementById('game-chat-form');
const gameChatInput = document.getElementById('userInput');
const game_id = window.location.pathname.split('/')[2];

gameChatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = gameChatInput.value;
  game_socket.emit('send-game-chat-message', ({game_id, message}));
  const game_message_list = getGameMessageList();
  appendGameMessageList(message_list);
  gameChatInput.value = '';
});

async function appendGameMessageList(message_list) {
  const messageContainer = document.getElementById('messages');
  messageContainer.innerHTML = '';
  message_list.forEach((message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message.message;
    messageContainer.append(messageElement);
  });
}

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

async function initGame(event) {
  event.preventDefault();
  const game_id = window.location.pathname.split('/')[2];
  const user = await getUser();
  const game = await getGame(game_id);
  if(game.gameHostId == user.id) {
    console.log('host');
    game_socket.emit('initGame', {game_id, user});
  } else {
    console.log('not host');
  }
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

async function getGameMessageList(game_id) {
  const message_list = await fetch(`/api/game-message-list/${game_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('message list');
      console.log(data[0]);
      return data;
    });
  return message_list;
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

async function appendConnectionMessage(message) {
  const messageContainer = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('text-white');
  messageElement.innerText = message;
  messageContainer.prepend(messageElement);
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

game_socket.on('game-start', (deck) => {
  const card_container = document.getElementById('deck-container');

  const game_id = window.location.pathname.split('/')[2];
  const user = getUser()
    .then((user) => {
      const user_cards = fetch(`/api/game-user-cards/${game_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((res) => res.json())
      .then((cards) => {
        cards.forEach((card) => {
          const card_div = document.createElement('div');
          card_div.classList.add('card');

          const card_img = document.createElement('img');
          card_img.src = "../assets/images/blue0.png"
          card_img.classList.add('card-img');

          card_div.appendChild(card_img);
          card_container.appendChild(card_div);
        });
      });
    });
  console.log('Game started');
});


game_socket.on('game-user-connected', (user) => {
  console.log(`${user.username} connected`);
});

game_socket.on('game-leave', (user) => {
  console.log(`${user.username} disconnected`);
});

game_socket.on('game-user-connected', (user) => {
  appendConnectionMessage(`${user.username} connected`);
});

game_socket.on('game-chat-message', (data) => {
  const messageList = getGameMessageList(data.message.game_id);
  appendGameMessageList(messageList);
});

game_socket.on('game-user-disconnected', (user) => {
  try {
    console.log(user);
    appendConnectionMessage(`${user.username} disconnected`);
  } catch (err) {
    console.log(err);
  }
});

game_socket.on('game-end', (data) => {
  console.log(`${data.name}: ${data.message}`);
});

game_socket.on('game-created', (game) => {
  console.log("Game created");
  console.log(game);
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
