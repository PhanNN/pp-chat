const router = require('express').Router({ mergeParams: true });
var {
  fetchConversations,
  fetchConversation
} = require('./app/controllers/conversationController')
var {
  uploadFile
} = require('./app/controllers/commonController')
var {getContacts} = require('./app/controllers/contactController')

router.get('/conversations', function(req, res, next) {
  const params = req.query
  fetchConversations(req, res, params.user)
})

router.get('/conversation', function(req, res, next) {
  const params = req.query
  fetchConversation(req, res, params.user, params.target)
})

router.get('/contacts', function(req, res, next) {
  const params = req.query
  getContacts(req, res, params.user)
})

router.post('/upload', function(req, res, next) {
  uploadFile(req, res)
})

module.exports = router