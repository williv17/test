const socket = io('http://localhost:3000');
const messageForm = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const access_token = document.getElementById('access_token');
const gameForm = document.getElementById('game-form');
const gamePasswordInput = document.getElementById('game-password');
const gameNameInput = document.getElementById('game-name');
const gameMaxPlayersInput = document.getElementById('game-max-players');


const user = getUser()
  .then((user) => {
    console.log(user);
    socket.emit('lobby-join', user);
    return user;
  })
  .catch((err) => {
    console.log(err);
  });

if (user === null) {
  window.location.href = 'http://localhost:3000/login';
}

socket.on('user-connected', (user) => {
  appendMessage(`${user.username} connected`);
});

socket.on('user-disconnected', (user) => {
  appendMessage(`${user.username} disconnected`);
});

socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
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
    socket.emit('create-game', game);
    console.log('game created');
    gameNameInput.value = '';
    gamePasswordInput.value = '';
    gameMaxPlayersInput.value = '';
  });
});


function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
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
