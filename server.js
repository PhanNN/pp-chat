const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {ExpressPeerServer} = require('peer')
const {io} = require('./socket')

const configDB = require('./config/database.js')

require('dotenv').load()
mongoose.connect(configDB.url)

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/attachments', express.static('attachments'))

app.get('/', (req, res) => {
  res.render('index')
})

server = app.listen(process.env.SERVER_PORT || 3000)
io(server)

const routes = require('./routes')
app.use('/', routes)

const peerserver = ExpressPeerServer(server, {
  debug: true
})
app.use('/peer', peerserver)

peerserver.on('connection', function(id) {
  console.log(`Connect ${id}`)
})

peerserver.on('disconnect', function(id) {
  console.log(`Disconnect ${id}`)
})
