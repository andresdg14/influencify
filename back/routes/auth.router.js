const router = require('express').Router();

const {
  signup,
  login,
  logout
} = require('../controlers/auth.controller');

router.post('/signup', signup);
router.post('/login', login);
router.delete('/', logout)

module.exports = router;