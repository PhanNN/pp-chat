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
  const myfile = $('#myfile')
  const videoBox = $('.video-box')
  const videoStream = $('#video-stream')[0]

  let chatWithData = ''
  let originUsername = ''
  let peer
  let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator)

  send_username.click(function() {
    originUsername = username.val().trim()
    peer = initPeer(originUsername)
    socket.emit('change_username', {
      username: originUsername
    })
    peer.on('call', function(call) {
      getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream) // Answer the call with an A/V stream.
        call.on('stream', function(remoteStream) {
          videoBox.removeClass('hidden-box')
          videoStream.srcObject = remoteStream
          videoStream.play()
        })
      }, function(err) {
        console.log('Failed to get local stream', err)
      })
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

  myfile.change((e) => uploadFile(e, socket, chatWithData))

  socket.on('new_message', (data) => {
    const receiver = data.username
    if (originUsername !== receiver && chatWithData !== receiver) {
      notiOther(contact, receiver)
      return
    }
    message.val('')
    feedback.html('')
    if ('attachment' === data.type) {
      chatroom.append(`<p class='message'> ${data.username}: <a href="${data.path}" download="${data.message}">${data.message}</a></p>`)
    } else {
      chatroom.append(`<p class='message'> ${data.username}: ${data.message} </p>`)
    }
    moveToBottom(chatroom)
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

    let conn = peer.connect(target)

    getUserMedia({video: true, audio: true}, function(stream) {
      let call = peer.call(target, stream)
      call.on('stream', function(remoteStream) {
        videoBox.removeClass('hidden-box')
        videoStream.srcObject = remoteStream
        videoStream.play()
      })
    }, function(err) {
      console.log('Failed to get local stream', err)
    })
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
        if ('attachment' === data.type) {
          chatroom.append(`<p class='message'> ${data.from}: <a href="${data.attachment.path}" download="${data.text}">${data.text}</a></p>`)
        } else {
          chatroom.append(`<p class='message'> ${data.from}: ${data.text} </p>`)
        }
      })
      moveToBottom(chatroom)
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function moveToBottom(chatroom) {
  chatroom.animate({
    scrollTop: chatroom.get(0).scrollHeight
  }, 1000)
}

function uploadFile(e, socket, to) {
  let file = e.target.files[0];
  if (!file) {
    return;
  }
  let data = new FormData()
  data.append('files', file)
  $.ajax({
    url: serverUrl + `/upload`,
    type: 'POST',
    data: data,
    contentType: false,
    cache: false,
    processData: false,
    success: function(res) {
      const resData = res.data
      socket.emit('new_message', {
        message: resData.name,
        to: to,
        attachment: resData
      })
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function initPeer(user) {
  let peer = new Peer(user, {
    host: '192.168.1.149',
    port: '3000',
    path: 'peer'
  })

  peer.on('connection', function(conn) {
    conn.on('data', function(data){
      console.log(data);
    })
  })
  return peer
}