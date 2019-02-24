const path = require('path')
const mkdirp = require('mkdirp')
const multer = require('multer')
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')
const {Attachment} = require("../models/attachment")

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

exports.uploadFile = (req, res) => {
  uploader.array('files')(req, res, (e, data) => {
    if (e) {
      console.log(e)
      res.json({success: false, data: err})
    }
    let file = req.files[0]
    if (file) {
      new Attachment({
        name: file.originalname,
        path: file.path,
        encoding: file.encoding,
        size: file.size,
        mimeType: file.mimetype
      }).save(function(err, item) {
        if (err)
        res.json({success: false, data: err})

        res.json({success: true, data: item})
      })
    }
  })
}

exports.getHash = (text) => {
  console.log(text)
  return crypto.createHmac('sha256', process.env.CRYPTO_SECRET)
    .update(text)
    .digest('hex')
}