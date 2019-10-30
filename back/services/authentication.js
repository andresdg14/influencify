const UserModel = require('../models/users.model')
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  jwt.verify(req.headers.token, 'secret', (err, token) => {
    if (err) { res.status(403).json({ error: 'Token not valid' }) }

    UserModel
      .findOne({ email: token.email })
      .then(user => {
        res.locals.user = user
        next()
      })
  });
}

module.exports = authenticate