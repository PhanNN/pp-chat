const mongoose = require('mongoose')

// Attachment
const attachmentSchema = mongoose.Schema({
  name: String,
  path: String,
  mimeType: String,
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Msg' },
  encoding: String,
  size: Number
})

module.exports.Attachment = mongoose.model('Attachment', attachmentSchema);