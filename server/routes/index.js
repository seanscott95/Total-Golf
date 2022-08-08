const router = require('express').Router();

const scorecardRoutes = require('./scorecardRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/scores', scorecardRoutes)
router.use('/api', userRoutes)

module.exports = router;