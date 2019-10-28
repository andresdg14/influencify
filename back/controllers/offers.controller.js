const OfferModel = require('../models/offer.model');

module.exports = {
  getAllOffers,
  getOfferById,
  deleteOfferById,
  createOffer,
  updateOffer
};

function getAllOffers(req, res) {
  OfferModel.find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))

}

function getOfferById(req, res) {
  OfferModel.findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteOfferById(req, res) {
  OfferModel.findById(req.params.id)
    .remove()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function createOffer(req, res) {
  OfferModel.create(req.body)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateOffer(req, res) {
  OfferModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function handdleError(err, res) {
  return res.status(400).json(err);
}