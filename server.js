const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {io} = require('./socket')

const configDB = require('./config/database.js')
mongoose.connect(configDB.url)

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/attachments', express.static('attachments'))

app.get('/', (req, res) => {
  res.render('index')
})

server = app.listen(3000)
io(server)

const routes = require('./routes')
app.use('/', routes)
