const router = require('express').Router();

const usersRouter = require('./users.router');
const offersRouter = require('./offers.router');
const influencersRouter = require('./influencers.router');
const authRouter = require('./auth.router');


router.use('/users', usersRouter);
router.use('/offers', offersRouter);
router.use('/influencers', influencersRouter);
router.use('/auth', authRouter);

module.exports = router;