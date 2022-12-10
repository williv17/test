// const socket = io('http://localhost:3000')
// const messageContainer = document.getElementById('messages')
// const messageForm = document.getElementById('chat-box')
// const messageInput = document.getElementById('chat-text')

// socket.on('chat-message', data => {
//  appendMessage(`${data.message}`)
// })

// messageForm.addEventListener('submit', e => {
//  e.preventDefault()
//  const message = messageInput.value
//  appendMessage(`You: ${message}`)
//  socket.emit('send-chat-message', message)
//  messageInput.value = ''
// })

// function appendMessage(message) {
//  const messageElement = document.createElement('div')
//  messageElement.innerText = message
//  messageContainer.append(messageElement)
// }