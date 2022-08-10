const router = require('express').Router();
const { 
    getMe,
    signupUser, 
    loginUser 
} = require('../controllers/userController');

const { authMiddleware } = require('../utils/auth');

router.post('/', signupUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);

module.exports = router;