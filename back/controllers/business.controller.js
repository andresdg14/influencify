const BusinessModel = require('../models/business.model');

module.exports = {
  getAllBusiness,
  getBusinessById,
  deleteBusinessById,
  createBusiness,
  updateBusiness,
};

function getAllBusiness(req, res) {
  BusinessModel.find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getBusinessById(req, res) {
  BusinessModel.findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteBusinessById(req, res) {
  BusinessModel.findById(req.params.id)
    .remove()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function createBusiness(req, res) {
  BusinessModel.create(req.body)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateBusiness(req, res) {
  BusinessModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}
