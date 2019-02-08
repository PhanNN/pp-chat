const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {ExpressPeerServer} = require('peer')
const {io} = require('./socket')

const configDB = require('./config/database.js')
mongoose.connect(configDB.url)

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/attachments', express.static('attachments'))

app.get('/', (req, res) => {
  res.render('index')
})

server = app.listen(3000, '192.168.1.149')
io(server)

const routes = require('./routes')
app.use('/', routes)
app.use('/peer', ExpressPeerServer(server, {
  debug: true
}))
