const conversationCtrl = require('./app/controllers/conversationController')
const { getHash } = require('./app/controllers/commonController')

exports.io = (server) => {
  const io = require('socket.io')(server)

  io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('change_username', (data) => {
      socket.username = data.username
      socket.join(getHash(socket.username))
      socket.broadcast.emit('online', socket.username);
    })

    socket.on('new_message', async (data) => {
      await conversationCtrl.saveMsg(socket.username, data.to, data.message, data.attachment)
      sendMsg(io, socket.username, data.to, data)
      sendMsg(io, socket.username, socket.username, data)
    })

    socket.on('read_message', async (data) => {
      conversationCtrl.readMsgs(socket.username, data.to)
    })

    socket.on('typing', (data) => {
      io.to(getHash(data.to)).emit('typing', {
        username: socket.username
      })
    })

    socket.on('untyping', (data) => {
      io.to(getHash(data.to)).emit('untyping', {
        username: socket.username
      })
    })
  })
}

function sendMsg(io, from, to, data) {
  const isAttachmentMsg = data.attachment
  io.to(getHash(to)).emit('new_message', {
    type: isAttachmentMsg ? 'attachment' : 'message',
    path: isAttachmentMsg ? data.attachment.path : '',
    message: data.message,
    username: from
  })
}