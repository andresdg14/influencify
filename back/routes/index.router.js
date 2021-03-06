const router = require('express').Router();
const authenticate = require('../services/authentication')

const usersRouter = require('./users.router');
const offersRouter = require('./offers.router');
const influencersRouter = require('./influencers.router');
const businessRouter = require('./business.router');
const authRouter = require('./auth.router');


router.use('/users', authenticate, usersRouter);
router.use('/offers', offersRouter);
router.use('/influencers', influencersRouter);
router.use('/business', businessRouter);
router.use('/auth', authRouter);

module.exports = router;