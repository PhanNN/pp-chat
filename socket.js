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
      await conversationCtrl.saveMsg(socket.username, data.to, data.message)
      io.to(data.to).emit('new_message', {
        message: data.message,
        username: socket.username
      })
      io.to(socket.username).emit('new_message', {
        message: data.message,
        username: socket.username
      })
    })

    socket.on('typing', (data) => {
      io.to(data.to).emit('typing', {
        username: socket.username
      })
    })
  })
}