const router = require('express').Router();

const userRoutes = require('./userRoutes');
const scorecardRoutes = require('./scorecardRoutes');
const scoreRoutes = require('./scoreRoutes');

router.use('/api/users', userRoutes);
router.use('/api/scores', scorecardRoutes);
router.use('/api/score', scoreRoutes);

module.exports = router;