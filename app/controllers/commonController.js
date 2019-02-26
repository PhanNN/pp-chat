const fs = require('fs')
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')
const GGStorage = require('@google-cloud/storage')
const AWS = require('aws-sdk')
const {Attachment} = require("../models/attachment")

exports.uploadFile = (req, res) => {
  const file = req.files[0]
  switch(process.env.UPLOAD_MODE) {
    case "LOCAL":
      if (file) {
        saveAttachment(file, res)
      }
    break
    case "AWS":
      let s3Bucket = new AWS.S3({
        accessKeyId: process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET,
        Bucket: process.env.BUCKET_NAME
      })
      s3Bucket.createBucket(() => {
        fs.readFile(file.path, function (err, data) {
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: uuidv4() + file.originalname,
            Body: data,
          }
          s3Bucket.upload(params, (err, data) => {
            if (err) {
              console.log(err)
              res.json({success: false, data: err})
            } else {
              saveAttachment(file, res, data.Location)
            }
          })
        })
     })
    break
    case "GOOGLE":
      const storage = new GGStorage({
        projectId: process.env.GOOGLE_PROJECT_ID,
        keyFilename: 'cloud_credential.json'
      });
      const bucket = storage.bucket(process.env.GOOGLE_BUCKET)
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
          saveAttachment(file, res, `https://storage.googleapis.com/${process.env.GOOGLE_BUCKET}/${gcsname}`)
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