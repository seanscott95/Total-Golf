const router = require('express').Router();
const { 
    getScorecard,
    setScorecard, 
    updateScorecard, 
    deleteScorecard 
} = require('../controllers/scorecardController');

router.route('/').get(getScorecard).post(setScorecard);

router.route('/:id').put(updateScorecard).delete(deleteScorecard);

module.exports = router;