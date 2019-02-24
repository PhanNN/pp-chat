exports.getContacts = (req, res, user) => {
  res.json({success: true, data: {
    'docs': [
      {
          'name': 'Demo',
          'avatar': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg'
      },
      {
          'name': 'Demo1',
          'avatar': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png'
      },
      {
          'name': 'Demo2',
          'avatar': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg'
      },
      {
          'name': 'Bingo',
          'avatar': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/bo-jackson.jpg'
      }
    ]
  }});
}