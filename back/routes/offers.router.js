const router = require('express').Router();

const {
  getAllOffers,
  getOfferById,
  deleteOfferById,
  createOffer,
  updateOffer
} = require('../controlers/offers.controller');

router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.delete('/:id', deleteOfferById)
router.post('/', createOffer);
router.put('/:id', updateOffer)

module.exports = router;