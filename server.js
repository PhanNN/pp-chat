const express = require('express')
const app = express()
const mongoose = require('mongoose')
const conversationCtrl = require('./app/controllers/conversationController')

const configDB = require('./config/database.js')
mongoose.connect(configDB.url)

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

server = app.listen(3000)

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('New user connected')

  // socket.username = 'Anonymous'

  socket.on('change_username', (data) => {
    socket.username = data.username
    socket.join(socket.username);
  })

  socket.on('new_message', async (data) => {
    await conversationCtrl.saveMsg(socket.username, data.to, data.message)
    // await conversationCtrl.saveMsg(data.to, socket.username, data.message)
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