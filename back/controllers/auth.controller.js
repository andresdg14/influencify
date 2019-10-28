const UserModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  signup,
  login,
  logout
};

function signup(req, res) {
  const hashed_pwd = bcrypt.hashSync(req.body.user_password, 10);
  UserModel.create({
      name: req.body.user_name,
      email: req.body.user_email,
      password: hashed_pwd
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
    .findOne({
      email: req.body.user_email
    })
    .then(user => {
      if (!user) {
        return res.json({
          error: 'wrong email'
        })
      }

      bcrypt.compare(req.body.user_password, user.password, (err, result) => {
        if (!result) {
          return res.json({
            error: `wrong password for ${req.body.user_email}`
          })
        }

        const user_data = {
          username: req.body.name,
          email: req.body.email
        };

        const token = jwt.sign(
          user_data,
          "secret", // TODO SECRET MORE SECRET PLEASE
          {
            expiresIn: "1h"
          }
        );

        return res.json({
          token: token,
          ...user_data
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