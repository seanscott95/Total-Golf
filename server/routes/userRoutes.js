const router = require('express').Router();
const { 
    getMe,
    signupUser, 
    loginUser 
} = require('../controllers/userController');

router.route('/', signupUser);
router.route('/login', loginUser);
router.route('/me', getMe);

module.exports = router;