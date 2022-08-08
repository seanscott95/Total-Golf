const router = require('express').Router();

const scorecardRoutes = require('./scorecardRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/scores', scorecardRoutes)
router.use('/api/users', userRoutes)

module.exports = router;