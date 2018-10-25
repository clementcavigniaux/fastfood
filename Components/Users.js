const mongoose = require('mongoose'),
 User = require('../Models/Users')
  config = require('../config')

exports.create = (req, res) => {
  const { firstName, lastName, password, username } = req.body
  var newUser = new User({ firstName, lastName, password, username })
  newUser.save((err, user) => {
    if (err) {
      return res.status(500).send({
        message: err
      })
    } else {
      return res.send('Utilisateur créé')
    }
  })
}

exports.list = (req, res) => {
  User.find({}, (err, users) => {
    var userMap = {}

    users.forEach(user => {
      userMap[user._id] = user
    })

    res.send(userMap)
  })
}

exports.remove = (req, res) => {
  User.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) return res.status(500).send(err)
    const response = {
      message: 'Utilisateur supprimé',
      id: user._id
    }
    return res.status(200).send(response)
  })
}

exports.login = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(422).end('Identifiants incorrect')
  }
  User.findOne(
    {
      email
    },
    (err, U) => {
      if (err) {
        res.status(200).send(err)
      }
      if (U) {
        bcrypt.compare(password, U.password, (err, match) => {
          if (err) {
            res.send(err)
          }
          if (match) {
            const token = jwt.sign(U.toJSON(), config.password, {
                expiresIn: 86400
              }),
              user = {
                firstName: U.firstName,
                lastName: U.lastName
              }
            res.status(200).send({ token, user })
          } else {
            res.status(422).json({ error: 'Wrong Password' })
          }
        })
      } else {
        res.status(404).end('no user')
      }
    }
  )
}

exports.register = (req, res) => {
  const User = new User(),
    salt = bcrypt.genSaltSync(10),
    { firstName, lastName, password, username } = req.body

  if (firstName && lastName && password && username) {
    bcrypt.hash(passwd, salt, null, (err, hash) => {
      if (err) {
        return res.status(500).send(err)
      }

      User.firstName = firstName
      User.lastName = lastName
      User.userName = firstName + lastName
      User.password = hash

      User.save(err => {
        err ? res.status(500).send(err) : res.status(200).send('User created')
      })
    })
  }
}
