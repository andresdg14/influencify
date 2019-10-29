const router = require('express').Router();
const authenticate = require('../services/authentication')

const {
  getAllOffers,
  getOfferById,
  deleteOfferById,
  createOffer,
  updateOffer
} = require('../controllers/offers.controller');

router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.delete('/:id', authenticate, deleteOfferById);
router.post('/', authenticate, createOffer);
router.put('/:id', authenticate, updateOffer)

module.exports = router;