const router = require('express').Router();
const { 
    getScorecard,
    setScorecard, 
    updateScorecard, 
    deleteScorecard 
} = require('../controllers/scorecardController');

const { authMiddleware } = require('../utils/auth');

router.route('/').post(authMiddleware, setScorecard);

router.route('/:id')
    .get(authMiddleware, getScorecard)
    .put(authMiddleware, updateScorecard)
    .delete(authMiddleware, deleteScorecard);

module.exports = router;