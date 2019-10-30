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
} = require('../controllers/users.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById)
router.post('/', createUser);
router.post('/:id/fav/:favId', addFavOfferByUserId);
router.post('/:id/offer/:offerId', addUsedOfferByUserId);
router.post('/:id/follow/:infId', addInfluencerByUserId);
router.put('/:id', updateUser);
router.get('/:id', getFavOffersById);
router.get('/:id', getUsedOffersById)


module.exports = router;