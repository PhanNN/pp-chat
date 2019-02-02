const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const findOrCreate = require('mongoose-findorcreate')

// Msg
const messageSchema = mongoose.Schema({
  text: String,
  createdAt: Date,
  from: String
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