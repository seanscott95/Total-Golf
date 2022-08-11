const router = require('express').Router();
const { 
    getScore, 
    updateScore, 
    deleteScore 
} = require('../controllers/scoreController');

const { authMiddleware } = require('../utils/auth');

router.route('/:id')
    .get(authMiddleware, getScore)
    .put(authMiddleware, updateScore)
    .delete(authMiddleware, deleteScore);

module.exports = router;