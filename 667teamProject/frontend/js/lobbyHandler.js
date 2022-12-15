const socket = io.connect('http://localhost:3000');
const messageForm = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const access_token = document.getElementById('access_token');
const gameForm = document.getElementById('game-form');
const gamePasswordInput = document.getElementById('game-password');
const gameNameInput = document.getElementById('game-name');
const gameMaxPlayersInput = document.getElementById('game-max-players');
const messages = [];
const gameContainer = document.getElementById('game-container');

const user = getUser()
  .then((user) => {
    console.log(user);
    socket.emit('lobby-join', user);
    const game_list = getLobbyGameList();
    appendGameList(game_list);
    return user;
  })
  .catch((err) => {
    console.log(err);
  });

if (user === null) {
  window.location.href = 'http://localhost:3000/login';
}

socket.on('user-connected', (user) => {
  appendConnectionMessage(`${user.username} connected`);
});

socket.on('user-disconnected', (user) => {
  try{
    console.log(user);
    appendConnectionMessage(`${user.username} disconnected`);
  }
  catch(err){
    console.log(err);
  }
});

socket.on('chat-message', (data) => {
  const message_list = getLobbyMessageList();
  appendMessageList(message_list);
  console.log(message_list);
});

socket.on('update-game-list', () => {
  console.log('update-game-list');
  const game_list = getLobbyGameList();
  appendGameList(game_list);
});


messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  const message_list = getLobbyMessageList();
  appendMessageList(message_list);
  console.log(message_list);
  console.log('message sent');
  messageInput.value = '';
});

gameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const gameName = gameNameInput.value;
  const gamePassword = gamePasswordInput.value;
  const gameMaxPlayers = gameMaxPlayersInput.value;
  if (gameName === '' || gamePassword === '' || gameMaxPlayers === '') {
    alert('Please fill out all fields');
    return;
  }

  user.then((user) => {
    const game = {
      gameName: gameName,
      gamePassword: gamePassword,
      maxPlayers: gameMaxPlayers,
      gameHost: user.username,
      gameHostId: user.id,
    };

    const new_game_res = createGame(game)
      .then((new_game_res) => {
        socket.emit('game-created', game);
        return new_game_res;
      })
      .catch((err) => {
        console.log(err);
      });

    if(new_game_res === null){
      alert('Game failed to create');
      return;
    }
  });
});

async function appendConnectionMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.prepend(messageElement);
}

async function appendGameList(game_list) {
  Promise.resolve(game_list).then((game_list) => {
    console.log(game_list.length);
    console.log("HERE");
    console.log(gameContainer.childNodes.length);
    const game_nodes = gameContainer.childNodes;
    while (gameContainer.firstChild) {
      gameContainer.removeChild(gameContainer.firstChild);
    }
    console.log("DELETED");
    console.log(gameContainer.childNodes.length);
    for (let i = 0; i < game_list.length; i++) {
      const game_list_item = document.createElement('li');
      game_list_item.className = 'game-list-item';
      game_list_item.id = game_list[i].id;
      game_list_item.innerHTML = game_list[i].gameName;
      game_list_item.innerHTML += ' - ' + game_list[i].gameHost;
      game_list_item.innerHTML += ' - ' + game_list[i].gameStatus;
      game_list_item.innerHTML += ' - ' + game_list[i].maxPlayers;
      game_list_item.onclick = function () {
        promptGamePassword(game_list[i]);
      };
      gameContainer.prepend(game_list_item);
    }
  });
}

async function appendMessageList(message_list) {
  Promise.resolve(message_list).then((message_list) => {
    console.log(message_list.length);
    console.log("HERE");
    console.log(messageContainer.childNodes.length);
    const message_nodes = messageContainer.childNodes;
    while (messageContainer.firstChild) {
      messageContainer.removeChild(messageContainer.firstChild);
    }
    console.log("DELETED");
    console.log(messageContainer.childNodes.length);
    for (let i = 0; i < message_list.length; i++) {
      const messageElement = document.createElement('div');
      messageElement.innerText = `${message_list[i].user_name}: ${message_list[i].context}`;
      messageContainer.append(messageElement);
    }
  });
}

async function promptGamePassword(game) {
  console.log('prompting password');
  const passwordForm = document.createElement('form');
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.placeholder = 'Enter game password';
  passwordInput.required = true;
  passwordForm.append(passwordInput);
  const passwordSubmit = document.createElement('input');
  passwordSubmit.type = 'submit';
  passwordSubmit.value = 'Submit';
  passwordForm.append(passwordSubmit);
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    if(password === game.gamePassword){
      window.open(`/game/${game.id}`, '_blank');
    } else {
      console.log('password incorrect');
    }
    console.log(user);
    return password;
  });
  console.log(passwordForm);
  const lobby_body_container = document.getElementById('lobby-body-container');
  console.log(lobby_body_container);
  lobby_body_container.append(passwordForm);
}


async function getLobbyMessageList() {
  const message_list = await fetch('/api/lobby-message-list', {
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
  console.log('message list2');
  return message_list;
}

async function getLobbyGameList() {
  const game_list = await fetch('/api/lobby-game-list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json())
  .then((data) => {
    console.log('game list');
    console.log(data[0]);
    return data;
  });

  console.log('game list2');
  return game_list;
}

async function getUser() {
  const user = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());

  return user;
}
