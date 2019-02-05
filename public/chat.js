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
  const contact = $('#contacts')

  var chatWithData = ''
  let originUsername = ''

  send_username.click(function() {
    originUsername = username.val().trim()
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
          contact.append(`<div class='contact'>
            <a class='name' href='#'>${item}</a>
            <span class='count'></span>
          </div>`)
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
    const receiver = data.username
    if (originUsername !== receiver && chatWithData !== receiver) {
      notiOther(contact, receiver)
    }
    message.val('')
    feedback.html('')
    chatroom.append(`<p class='message'> ${data.username}: ${data.message} </p>`)
  })

  socket.on('typing', (data) => {
    feedback.html(`<p><i>${data.username} is typing ...</i></p>`)
  })

  $(document).on("click", ".name", function(event) {
    const curTarget = event.currentTarget
    const target = curTarget.innerText
    const countElm = curTarget.nextElementSibling
    countElm.innerText = ''
    chatroom.html('')
    loadConversation(chatroom, originUsername, target)
    chatWithData = target
  })
})

function notiOther(contact, item) {
  const noti = contact.children('.contact').filter(function(index, it) {
    return it.firstElementChild.text === item
  })[0].lastElementChild
  let count = parseInt(noti.innerText)
  if (count) {
    noti.innerText = ++count
  } else {
    noti.innerText = 1
  }
}

function loadConversation(chatroom, source, target) {
  $.ajax({
    url: serverUrl + `/conversation?user=${source}&target=${target}`,
    type: 'GET',
    success: function(res) {
      res.data.messages.forEach(function(data) {
        chatroom.append(`<p class='message'> ${data.from}: ${data.text} </p>`)
      })
      chatroom.animate({
        scrollTop: chatroom.get(0).scrollHeight
      }, 1000)
    },
    error: function(err) {
      console.log(err)
    }
  })
}