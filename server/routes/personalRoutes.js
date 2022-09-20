const router = require('express').Router();
const { 
    getUserScorecards,
} = require('../controllers/personalController');

const { authMiddleware } = require('../utils/auth');

router.get('/:name', authMiddleware, getUserScorecards);

module.exports = router;