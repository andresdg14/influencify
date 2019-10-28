const InfluencerModel = require('../models/influencers.model');

module.exports = {
  getAllInfluencers,
  getInfluencerById,
  deleteInfluencerById,
  createInfluencer,
  updateInfluencer
};

function getAllInfluencers(req, res) {
  InfluencerModel.find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))

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

function handdleError(err, res) {
  return res.status(400).json(err);
}