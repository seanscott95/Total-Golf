const asyncHandler = require('express-async-handler');
const { Scorecard, Score } = require('../models')

// @desc Get User scorecards
// @route GET /api/scores
// @access Private
const getUserScorecards = asyncHandler(async (req, res) => {
    // console.log('yo')
    // const scorecard = await Scorecard.find().populate('score');
    const scorecard = await Score.find({ username: req.params.name});


    if (!scorecard) {
        res.status(400);
        throw new Error('There are no scorecards');
    };

    // console.log('pc', scorecard)
    res.status(200).json(scorecard);
    // console.log(scorecard);
    // console.log([...scorecard]);
});

module.exports = {
    getUserScorecards,
}