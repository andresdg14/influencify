const UserModel = require('../models/users.model');

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  getFavOffersById,
  getUsedOffersById
};

function getAllUsers(req, res) {
  UserModel.find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getUserById(req, res) {
  UserModel.findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteUserById(req, res) {
  UserModel.findById(req.params.id)
    .remove()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function createUser(req, res) {
  UserModel.create(req.body)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateUser(req, res) {
  UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getFavOffersById(req, res) {
  UserModel.findById(req.params.id)
  populate('offer')
  .then((user) => {
    console.log(user.favOffers)
  })
  .catch((err) => handdleError(err, res))
}

function getUsedOffersById(req, res) {
  UserModel.findById(req.params.id)
  populate('offer')
    .then((user) => {
      console.log(user.usedOffers)
    })
    .catch((err) => handdleError(err, res))

}

function handdleError(err, res) {
  return res.status(400).json(err);
}