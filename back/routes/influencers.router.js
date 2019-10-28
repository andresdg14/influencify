const router = require('express').Router();

const {
  getAllInfluencers,
  getInfluencerById,
  deleteInfluencerById,
  createInfluencer,
  updateInfluencer
} = require('../controllers/influencers.controller');

router.get('/', getAllInfluencers);
router.get('/:id', getInfluencerById);
router.delete('/:id', deleteInfluencerById)
router.post('/', createInfluencer);
router.put('/:id', updateInfluencer)

module.exports = router;