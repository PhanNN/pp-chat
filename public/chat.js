const serverUrl = 'http://localhost:3000'
let socket, message, chatWithData;

// $('.chat[data-chat=person2]').classList.add('active-chat')
// $('.person[data-chat=person2]').classList.add('active')

// let friends = {
//     list: document.querySelector('ul.people'),
//     all: document.querySelectorAll('.left .person'),
//     name: ''
//   },
//   chat = {
//     container: document.querySelector('.container .right'),
//     current: null,
//     person: null,
//     name: document.querySelector('.container .right .top .name')
//   }

// friends.all.forEach(f => {
//   f.addEventListener('mousedown', () => {
//     f.classList.contains('active') || setAciveChat(f)
//   })
// });

// function setAciveChat(f) {
//   friends.list.querySelector('.active').classList.remove('active')
//   f.classList.add('active')
//   chat.current = chat.container.querySelector('.active-chat')
//   chat.person = f.getAttribute('data-chat')
//   chat.current.classList.remove('active-chat')
//   chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat')
//   friends.name = f.querySelector('.name').innerText
//   chat.name.innerHTML = friends.name
// }

$(function() {
  socket = io.connect(serverUrl)

  message = $('#message')
  const username = $('#username')
  const send_message = $('#send_message')
  const send_chatWith = $('#send_chat_with')
  const send_username = $('#send_username')
  const chatroom = $('#chatroom')
  const feedback = $('#feedback')
  const contact = $('#contacts')
  const myfile = $('#myfile')
  const videoBox = $('.video-box')
  const chatWith = $('#chat-with')
  const videoStream = $('#video-stream')[0]

  chatWithData = ''
  let originUsername = ''
  let peer
  let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator)

  send_username.click(function() {
    originUsername = username.val().trim()
    peer = initPeer(originUsername)
    socket.emit('change_username', {
      username: originUsername
    })
    // peer.on('call', function(call) {
    //   getUserMedia({video: true, audio: true}, function(stream) {
    //     call.answer(stream) // Answer the call with an A/V stream.
    //     call.on('stream', function(remoteStream) {
    //       videoBox.removeClass('hidden-box')
    //       videoStream.srcObject = remoteStream
    //       videoStream.play()
    //     })
    //   }, function(err) {
    //     console.log('Failed to get local stream', err)
    //   })
    // })
    $.ajax({
      url: serverUrl + '/contacts',
      type: 'GET',
      success: function(res) {
        let contacts = res.data.docs
        contacts.splice(contacts.map(item => item.name).indexOf(originUsername), 1);
        res.data.docs.forEach(function(item) {
          contact.append(`<li class="person">
              <img src="${item.avatar}" alt="" />
              <span class="name">${item.name}</span>
              <span class='status'>
                <i class="fas fa-circle"></i>
              </span>
              <span class="time">2:09 PM</span>
              <span class="preview">I was wondering...</span>
          </li>`)
        })

      },
      error: function(err) {
        console.log(err)
      }
    })
  })

  send_message.click(function() {
    sendMsg(socket, chatWithData, message.val())
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
    const chatClass = originUsername === receiver ? 'me' : 'you'
    message.val('')
    feedback.html('')
    if ('attachment' === data.type) {
      chatroom.append(`<div class="bubble ${chatClass}">
                          <a href="${data.path}" download="${data.message}">${data.message}</a>
                      </div>`)
    } else {
      chatroom.append(`<div class="bubble ${chatClass}">
                          ${data.message}
                      </div>`)
    }
    moveToBottom(chatroom)
  })

  socket.on('typing', (data) => {
    feedback.html(`<p><i>${data.username} is typing ...</i></p>`)
  })

  socket.on('online', (data) => {
    changeStatus(contact, data, true)
  })

  socket.on('offline', (data) => {
    changeStatus(contact, data, false)
  })

  $(document).on("click", ".name", function(event) {
    const curTarget = event.currentTarget
    const target = curTarget.innerText
    const countElm = curTarget.nextElementSibling.nextElementSibling
    countElm.innerText = ''
    chatroom.html('')
    loadConversation(chatroom, originUsername, target)
    chatWithData = target
    chatWith.text(target)

    let conn = peer.connect(target)

    // getUserMedia({video: true, audio: true}, function(stream) {
    //   let call = peer.call(target, stream)
    //   call.on('stream', function(remoteStream) {
    //     videoBox.removeClass('hidden-box')
    //     videoStream.srcObject = remoteStream
    //     videoStream.play()
    //   })
    // }, function(err) {
    //   console.log('Failed to get local stream', err)
    // })
  })
})

function sendMsg(socket, to, msg) {
  if (msg) {
    socket.emit('new_message', {
      message: msg,
      to: to
    })
  }
}

function handleSendMsg() {
  sendMsg(socket, chatWithData, typeof message !== 'undefined' ? message.val() : null)
}

function notiOther(contact, item) {
  // const noti = contact.children('.contact').filter(function(index, it) {
  //   return it.firstElementChild.text === item
  // })[0].lastElementChild
  // let count = parseInt(noti.innerText)
  // if (count) {
  //   noti.innerText = ++count
  // } else {
  //   noti.innerText = 1
  // }
}

function changeStatus(contact, item, active) {
  // const status = contact.children('.contact').filter(function(index, it) {
  //   return it.firstElementChild.text === item
  // })[0].firstElementChild.nextElementSibling
  // if (active) {
  //   status.classList.add('active')
  // } else {
  //   status.classList.remove('active')
  // }
}

function loadConversation(chatroom, source, target) {
  $.ajax({
    url: serverUrl + `/conversation?user=${source}&target=${target}`,
    type: 'GET',
    success: function(res) {
      res.data.messages.forEach(function(data) {
        const chatClass = source === data.from ? 'me' : 'you'
        if ('attachment' === data.type) {
          chatroom.append(`<div class='bubble ${chatClass}'> <a href="${data.attachment.path}" download="${data.text}">${data.text}</a></div>`)
        } else {
          chatroom.append(`<div class='bubble ${chatClass}'> ${data.text} </div>`)
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
    host: 'localhost',
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