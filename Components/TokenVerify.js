const jwt = require('jsonwebtoken'),
  User = require('../Models/Users')

module.exports = (req, res, next) => {
  let token = req.headers.authorization

  if (token) {
    jwt.verify(token, 'pierreclouet', (err, decoded) => {
      if (err || !decoded) {
        return res.status(402).send({ error: err })
      }
      User.findById(decoded._id, (err, user) => {
        if (err) {
          return res.status(401).send(err)
        }
        user ? next() : res.status(401).send(err)
      })
    })
  } else {
    res.status(404).send('no token')
  }
}
