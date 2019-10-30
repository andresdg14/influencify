const router = require('express').Router();
const authenticate = require('../services/authentication')

const {
  getAllInfluencers,
  getInfluencerById,
  deleteInfluencerById,
  createInfluencer,
  updateInfluencer,
} = require('../controllers/influencers.controller');

router.get('/', getAllInfluencers);
router.get('/:id', getInfluencerById);
router.delete('/:id', authenticate, deleteInfluencerById)
router.post('/', authenticate, createInfluencer);
router.put('/:id', authenticate, updateInfluencer);

module.exports = router;