const router = require('express').Router();
const { 
    getMe,
    signupUser, 
    loginUser 
} = require('../controllers/userController');

router.post('/', signupUser);
router.post('/login', loginUser);
router.get('/me', getMe);

module.exports = router;