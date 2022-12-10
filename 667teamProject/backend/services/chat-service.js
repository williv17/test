const socket = io('http://localhost:3000');
const messageForm = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const access_token = document.getElementById('access_token');

const user = getUser()
  .then((user) => {
    console.log(user);
    socket.emit('lobby-join', user);
  })
  .catch((err) => {
    console.log(err);
  });


socket.on('user-connected', (user) => {
  appendMessage(`${user.username} connected`);
});

socket.on('user-disconnected', (user) => {
  appendMessage(`${user.username} disconnected`);
});

socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});


messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  console.log('message sent');
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
};

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