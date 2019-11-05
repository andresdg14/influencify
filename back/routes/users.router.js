const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  getFavOffersById,
  getUsedOffersById,
  addFavOfferByUserId,
  addUsedOfferByUserId,
  addInfluencerByUserId
  // getFilteredInfluencersList
} = require('../controllers/users.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById)
router.post('/', createUser);
router.post('/:id/fav/:favId', addFavOfferByUserId);
router.post('/:id/offer/:offerId', addUsedOfferByUserId);
router.post('/:id/follow/:infId', addInfluencerByUserId);
router.put('/:id', updateUser);
router.get('/:id/favoffers', getFavOffersById);
router.get('/:id/usedoffers', getUsedOffersById)
// router.get('/:id/influencerslist', getFilteredInfluencersList)


module.exports = router;