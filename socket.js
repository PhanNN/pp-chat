const conversationCtrl = require('./app/controllers/conversationController')

exports.io = (server) => {
  const io = require('socket.io')(server)

  io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('change_username', (data) => {
      socket.username = data.username
      socket.join(socket.username);
    })

    socket.on('new_message', async (data) => {
      await conversationCtrl.saveMsg(socket.username, data.to, data.message, data.attachment)
      sendMsg(io, socket.username, data.to, data)
      sendMsg(io, socket.username, socket.username, data)
    })

    socket.on('typing', (data) => {
      io.to(data.to).emit('typing', {
        username: socket.username
      })
    })
  })
}

function sendMsg(io, from, to, data) {
  const isAttachmentMsg = data.attachment
  io.to(to).emit('new_message', {
    type: isAttachmentMsg ? 'attachment' : 'message',
    path: isAttachmentMsg ? data.attachment.path : '',
    message: data.message,
    username: from
  })
}