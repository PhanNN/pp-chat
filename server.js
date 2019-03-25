const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {ExpressPeerServer} = require('peer')
const sslRedirect = require('heroku-ssl-redirect')
const {io} = require('./socket')

const configDB = require('./config/database.js')

require('dotenv').load()
mongoose.connect(configDB.url)

app.set('view engine', 'ejs')

// enable ssl redirect
app.use(sslRedirect())
app.use(express.static('public'))
app.use('/attachments', express.static('attachments'))

app.get('/', (req, res) => {
  res.render('index')
})

const port = process.env.PORT || 3000
server = app.listen(port, () => {
    console.log("App is running on port " + port)
});
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
