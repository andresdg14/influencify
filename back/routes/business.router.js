const router = require('express').Router();

const {
  getAllBusiness,
  getBusinessById,
  deleteBusinessById,
  createBusiness,
  updateBusiness
} = require('../controllers/business.controller');

router.get('/', getAllBusiness);
router.get('/:id', getBusinessById);
router.delete('/:id', deleteBusinessById)
router.post('/', createBusiness);
router.put('/:id', updateBusiness);

module.exports = router;