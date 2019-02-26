const fs = require('fs')
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')
const Storage = require('@google-cloud/storage');
const {Attachment} = require("../models/attachment")
const bucketName = 'cnnbucket'
const projectId = 'peva-212115'

exports.uploadFile = (req, res) => {
  const file = req.files[0]
  switch(process.env.UPLOAD_MODE) {
    case "LOCAL":
      if (file) {
        saveAttachment(file, res)
      }
    break
    case "AWS":
    break
    case "GOOGLE":
      const storage = new Storage({
        projectId: projectId,
        keyFilename: 'cloud_credential.json'
      });
      const bucket = storage.bucket(bucketName)
      const gcsname = uuidv4() + file.originalname
      const files = bucket.file(gcsname)

      fs.createReadStream(file.path)
        .pipe(files.createWriteStream({
          metadata: {
            contentType: file.mimetype
          }
        }))
        .on('error', (err) => {
          res.json({success: false, data: err})
        })
        .on('finish', () => {
          saveAttachment(file, res, `https://storage.googleapis.com/${bucketName}/${gcsname}`)
        })
    break
    default:
    break
  }
}

function saveAttachment(file, res, path) {
  new Attachment({
    name: file.originalname,
    path: path ? path : file.path,
    encoding: file.encoding,
    size: file.size,
    mimeType: file.mimetype
  }).save(function(err, item) {
    if (err)
    res.json({success: false, data: err})

    res.json({success: true, data: item})
  })
}

exports.getHash = (text) => {
  console.log(text)
  return crypto.createHmac('sha256', process.env.CRYPTO_SECRET)
    .update(text)
    .digest('hex')
}