const _ = require('lodash')
const {fetchConversationsWithNewMsg} = require("./conversationController")

const contacts = [
  {
    'name': 'Demo',
    'avatar': 'https://i-h2.pinimg.com/564x/3d/d0/6c/3dd06c3d0e5dd47e0ee16f1da7babcd8.jpg'
  },
  {
    'name': 'Demo1',
    'avatar': 'https://i-h2.pinimg.com/564x/00/97/1b/00971b1a4b0e1fd3b369cfc14b3f5a13.jpg'
  },
  {
    'name': 'Demo2',
    'avatar': 'https://i-h2.pinimg.com/564x/dc/c9/fb/dcc9fbffb32abdab0e51dad25140999c.jpg'
  },
  {
    'name': 'Bingo',
    'avatar': 'https://i-h2.pinimg.com/564x/43/c4/66/43c466ae4055c7d2baea56c1adfc9403.jpg'
  },
  {
    'name': 'HarleyQuinn',
    'avatar': 'https://i-h2.pinimg.com/564x/38/5e/53/385e532eb092a660d2faa74b5b3972b6.jpg'
  }
]

exports.getContacts = async (req, res, user) => {
  const unreadConversations = await fetchConversationsWithNewMsg(user)
  res.json({success: true, data: {
    'user': contacts.filter((it) => it['name'] == user)[0],
    'docs': _.reverse(
      _.sortBy(
        _.forEach(contacts.filter((it) => it['name'] != user), (it) => {
          const conv = _.find(unreadConversations, { 'owner': it['name'] })
          it.unreadMsg = conv ? conv.unreadMsg : 0
        }), 'unreadMsg')
      )
  }});
}