exports.getContacts = (req, res, user) => {
  res.json({success: true, data: {
    'docs': [
      'Demo',
      'Demo1',
      'Demo2',
      'Bingo'
    ]
  }});
}