const router = require('express').Router({ mergeParams: true })
const uuidv4 = require('uuid/v4')
const mkdirp = require('mkdirp')
const multer = require('multer')
const path = require('path')
var {
  fetchConversations,
  fetchConversation
} = require('./app/controllers/conversationController')
var {
  uploadFile
} = require('./app/controllers/commonController')
var {getContacts} = require('./app/controllers/contactController')
const ATTACHMENTS_ROOT = 'attachments'

const uploader = multer({
  desc: ATTACHMENTS_ROOT,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const date = new Date()
      const dir = path.join(ATTACHMENTS_ROOT, `/${date.getFullYear()}/${date.getMonth() + 1}`)
      file.storedPath = `${date.getFullYear()}/${date.getMonth() + 1}`
      mkdirp(dir, (e) => {
        if (e) return cb(null, ATTACHMENTS_ROOT)
        cb(null, dir)
      })
    },
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}.${file.originalname.split('.').pop().toLowerCase()}`)
    }
  })
})

router.get('/conversations', function(req, res, next) {
  const params = req.query
  fetchConversations(req, res, params.user)
})

router.get('/conversation', function(req, res, next) {
  const params = req.query
  fetchConversation(req, res, params.user, params.target, params.page)
})

router.get('/contacts', function(req, res, next) {
  const params = req.query
  getContacts(req, res, params.user)
})

router.post('/upload', uploader.array('files'), function(req, res, next) {
  uploadFile(req, res)
})

module.exports = router