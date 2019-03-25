exports.getContacts = (req, res, user) => {
  res.json({success: true, data: {
    'docs': [
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
      }
    ]
  }});
}