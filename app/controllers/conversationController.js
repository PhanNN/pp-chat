const {Conversation, Msg} = require("../models/conversation")

exports.saveMsg = (from, to, msg, attachment) => {
  Conversation.findOrCreate({
    owner: from,
    to: to
  }, (err, item, created) => {
    Msg.create({
      type: typeof attachment !== 'undefined' ? 'attachment' : 'message',
      text: msg,
      from: from,
      attachment: attachment,
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

exports.fetchConversations = (req, res, user) => {
  Conversation.paginate({
    owner: {
      $eq: user
    }
  }, { 
    offset: 0,
    limit: 100,
    populate: [{
      path: 'messages'
    }]
  })
  .then(function(result) {
    res.json({success: true, data: result});
  })
}

exports.fetchConversation = (req, res, user, target) => {
  Conversation.findOne({
    owner: {
      $eq: user
    },
    to: {
      $eq: target
    }
  })
  .populate({
    path: 'messages',
    populate: {
      path: 'attachment'
    }
  })
  .then(function(result) {
    res.json({success: true, data: result});
  })
}