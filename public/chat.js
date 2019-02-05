const serverUrl = 'http://localhost:3000'

$(function() {
  const socket = io.connect(serverUrl)

  const message = $('#message')
  const username = $('#username')
  const send_message = $('#send_message')
  const send_chatWith = $('#send_chat_with')
  const send_username = $('#send_username')
  const chatroom = $('#chatroom')
  const feedback = $('#feedback')
  const contact = $('#contact')

  var chatWithData = ''
  let originUsername = ''

  send_username.click(function() {
    originUsername = username.val()
    socket.emit('change_username', {
      username: originUsername
    })
    $.ajax({
      url: serverUrl + '/contacts',
      type: 'GET',
      success: function(res) {
        let contacts = res.data.docs
        contacts.splice(contacts.indexOf(originUsername), 1);
        res.data.docs.forEach(function(item) {
          contact.append(`<p class='contact message'> ${item} </p>`)
        })

      },
      error: function(err) {
        console.log(err)
      }
    })
  })

  send_message.click(function() {
    socket.emit('new_message', {
      message: message.val(),
      to: chatWithData
    })
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

  $(document).on("click", ".contact", function(event) {
    const target = event.currentTarget.innerText
    loadConversation(chatroom, originUsername, target)
    chatWithData = target
  })
})

function loadConversation(chatroom, source, target) {
  $.ajax({
    url: serverUrl + `/conversation?user=${source}&target=${target}`,
    type: 'GET',
    success: function(res) {
      res.data.messages.forEach(function(data) {
        chatroom.append(`<p class='message'> ${data.from}: ${data.text} </p>`)
      })
    },
    error: function(err) {
      console.log(err)
    }
  })
}