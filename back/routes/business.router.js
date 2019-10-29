const router = require('express').Router();
const authenticate = require('../services/authentication')

const {
  getAllBusiness,
  getBusinessById,
  deleteBusinessById,
  createBusiness,
  updateBusiness
} = require('../controllers/business.controller');

router.get('/', authenticate, getAllBusiness);
router.get('/:id', authenticate, getBusinessById);
router.delete('/:id', authenticate, deleteBusinessById)
router.post('/', authenticate, createBusiness);
router.put('/:id', authenticate, updateBusiness);

module.exports = router;