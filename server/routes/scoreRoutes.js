const router = require('express').Router();
const { 
    getScore,
    // setScore, 
    // updateScore, 
    // deleteScore 
} = require('../controllers/scoreController');

const { authMiddleware } = require('../utils/auth');

// router.route('/').post(authMiddleware, setScore);

router.route('/:id')
    .get(authMiddleware, getScore)
    // .put(authMiddleware, updateScore)
    // .delete(authMiddleware, deleteScore);

module.exports = router;