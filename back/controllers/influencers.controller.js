const InfluencerModel = require('../models/influencers.model');

module.exports = {
  getAllInfluencers,
  getAllInfluencersList,
  getInfluencerById,
  deleteInfluencerById,
  createInfluencer,
  updateInfluencer,
  addFollower,
  addOffer
};
function getAllInfluencers(req, res) {
  return getAllInfluencersList()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getAllInfluencersList() {
  return InfluencerModel.find()
    .populate('offers')
    .then(influencers => influencers)
}

function getInfluencerById(req, res) {
  InfluencerModel.findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteInfluencerById(req, res) {
  InfluencerModel.findById(req.params.id)
    .remove()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function createInfluencer(req, res) {
  InfluencerModel.create(req.body)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateInfluencer(req, res) {
  InfluencerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function addFollower(me, follower) {
  return InfluencerModel.findById(me)
    .then((influencer) => {
      influencer.followers.push(follower)
      return influencer.save();
    })
    .catch((err) => console.log(err))
}

function addOffer(me, offer) {
  return InfluencerModel.findById(me)
  .then((influencer) => {
    influencer.offers.push(offer)
    return influencer.save();
  })
  .catch((err) => console.log(err))
}

function handdleError(err, res) {
  return res.status(400).json(err);
}