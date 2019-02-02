const {Conversation, Msg} = require("../models/conversation")

exports.saveMsg = (from, to, msg) => {
  Conversation.findOrCreate({
    owner: from,
    to: to
  }, (err, item, created) => {
    Msg.create({
      text: msg,
      from: from,
      createdAt: Date()
    }, function(err, val) {
      if (err) {
        console.err(err)
      }
      // https://github.com/Automattic/mongoose/issues/4455#issuecomment-250404913
      item.messages = item.messages.concat([val])
      item.save()

      Conversation.findOrCreate({
        owner: to,
        to: from
      }, (err, reverseItem, created) => {
        reverseItem.messages = reverseItem.messages.concat([val])
        reverseItem.save()
      })
    })
  })
}