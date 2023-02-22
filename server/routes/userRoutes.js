const router = require('express').Router();
const { 
    getMe,
    signupUser, 
    signinUser 
} = require('../controllers/userController');

const { authMiddleware } = require('../utils/auth');

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.get('/me', authMiddleware, getMe);

module.exports = router;