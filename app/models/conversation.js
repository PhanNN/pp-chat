const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const findOrCreate = require('mongoose-findorcreate')

// Msg
const messageSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['message', 'attachment'],
    default : 'message'
  },
  text: String,
  createdAt: Date,
  from: String,
  attachment: { type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }
})

messageSchema.plugin(mongoosePaginate);
module.exports.Msg = mongoose.model('Msg', messageSchema);


// Conversation
const conversationSchema = mongoose.Schema({
  owner: String,
  to: String,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Msg', usePushEach: true }],
})

conversationSchema.plugin(findOrCreate);
conversationSchema.plugin(mongoosePaginate);
module.exports.Conversation = mongoose.model('Conversation', conversationSchema);