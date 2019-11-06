const UserModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  signup,
  login,
  logout
};

function signup(req, res) {
  const hashed_pwd = bcrypt.hashSync(req.body.password, 10);
  UserModel.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashed_pwd,
      influencers: [res.locals.superInfluencer._id]
    })
    .then(() => {
      login(req, res)
    })
    .catch((err) => res.status(403).json({
      error: err.errmsg
    }))
}

function login(req, res) {
  UserModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) { return res.json({ error: 'wrong email' }) }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) { return res.json({ error: `wrong password for ${req.body.email}` }) }

        const user_data = { username: user.username, email: user.email, name: user.name, profileImg: user.profileImg };

        const token = jwt.sign(
          user_data,
          "secret", // TODO SECRET MORE SECRET PLEASE
          { expiresIn: "3w" }
        );

        return res.json({
          token: token,
          ...user_data,
          _id : user._id
        });
      })
    })
    .catch(err => handdleError(err, res));
}

function logout(req, res) {
  UserModel.findById(req.params.id)
    .remove()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function handdleError(err, res) {
  console.log(err);
  return res.status(400).json(err);
}