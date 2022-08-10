const router = require('express').Router();
const { 
    getScorecard,
    setScorecard, 
    updateScorecard, 
    deleteScorecard 
} = require('../controllers/scorecardController');

const { authMiddleware } = require('../utils/auth');

router.route('/').get(authMiddleware, getScorecard).post(authMiddleware, setScorecard);

router.route('/:id').put(authMiddleware, updateScorecard).delete(authMiddleware, deleteScorecard);

module.exports = router;