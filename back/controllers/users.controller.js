const UserModel = require('../models/users.model');

const {
  addFollower,
  getAllInfluencersList
} = require('./influencers.controller')

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  getFavOffersById,
  getUsedOffersById,
  addFavOfferByUserId,
  addUsedOfferByUserId,
  addInfluencerByUserId,
  getFilteredInfluencersList
};

function getAllUsers(req, res) {
  UserModel.find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getUserById(req, res) {
  UserModel.findById(req.params.id)
    .populate({path: 'influencers',
    populate: {path: 'offers', model: 'offer', 
    populate: {path: 'business', model: 'business'}}
  })
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
    .populate('offers')
    .then((user) => {
      console.log(user.favOffers)
    })
    .catch((err) => handdleError(err, res))
}

function getUsedOffersById(req, res) {
  UserModel.findById(req.params.id)
    .populate('offers')
    .then((user) => res.json(user.usedOffers))
    .catch((err) => handdleError(err, res))
}

function addFavOfferByUserId(req, res) {
  UserModel.findById(req.params.id)
    .then((user) => {
      user.favOffers.push(req.params.favId)
      user.save()
        .then(() => res.json({
          msg: "Guardado como favorito"
        }))
        .catch((err) => handdleError(err, res))

    }).catch((err) => handdleError(err, res))
}

function addUsedOfferByUserId(req, res) {
  UserModel.findById(req.params.id)
    .then((user) => {
      user.usedOffers.push(req.params.offerId)
      user.save()
        .then(() => res.json({
          msg: "Esta oferta se ha usado"
        }))
        .catch((err) => handdleError(err, res))

    }).catch((err) => handdleError(err, res))
}

function addInfluencerByUserId(req, res) {
  UserModel.findById(req.params.id)
    .then((user) => {
      if (!user.influencers.includes(req.params.infId)) {
        user.influencers.push(req.params.infId);
        user.save()
          .then(() => {
            addFollower(req.params.infId, req.params.id)
              .then(() => {
                res.json({
                  msg: "Has comenzado a seguir al influencer"
                });
              })
              .catch((err) => handdleError(err, res))
          })
          .catch((err) => handdleError(err, res))
      }
    }).catch((err) => handdleError(err, res))
}



function getFilteredInfluencersList(req, res) {
  console.log('DENTROOO')
  console.log(req.params.id)
  UserModel.findById(req.params.id)
    .populate('influencers')
    .then((response) => {

      let userInfluencers = response.influencers
      getAllInfluencersList()
        .then((allInfluencers) => {
          console.log({allInfluencers})
          let userInfluencersIDs = response.influencers.map(influencer => influencer._id)
          let filterInfluencers = allInfluencers.filter(e => !userInfluencersIDs.includes(e._id))
          res.json(filterInfluencers)
        })
        .catch((err) => handdleError(err, res))
    })
    .catch(err => res.json(err))
}

function handdleError(err, res) {
  return res.status(400).json(err);
}