const router = require('express').Router();
const { 
    getUser,
    setUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

router.route('/').get(getUser).post(setUser);

router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;