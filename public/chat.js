$(function() {
  const socket = io.connect('http://localhost:3000')

  const message = $('#message')
  const username = $('#username')
  const chatWith = $('#chat_with')
  const send_message = $('#send_message')
  const send_chatWith = $('#send_chat_with')
  const send_username = $('#send_username')
  const chatroom = $('#chatroom')
  const feedback = $('#feedback')

  var chatWithData = ''

  send_username.click(function() {
    socket.emit('change_username', {
      username: username.val()
    })
  })

  send_message.click(function() {
    socket.emit('new_message', {
      message: message.val(),
      to: chatWithData
    })
  })

  send_chatWith.click(function() {
    chatWithData = chatWith.val()
  })

  message.bind('keypress', () => {
    socket.emit('typing', {
      to: chatWithData
    })
  })

  socket.on('new_message', (data) => {
    message.val('');
    feedback.html('')
    chatroom.append(`<p class='message'> ${data.username}: ${data.message} </p>`)
  })

  socket.on('typing', (data) => {
    feedback.html(`<p><i>${data.username} is typing ...</i></p>`)
  })
})