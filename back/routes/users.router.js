const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  getFavOffersById,
  getUsedOffersById
} = require('../controllers/users.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById)
router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getFavOffersById);
router.get('/:id', getUsedOffersById)

module.exports = router;