const asyncHandler = require('express-async-handler');
const { Scorecard, Score } = require('../models');

// @desc Get User scorecards
// @route GET /api/scores
// @access Private
const getUserScorecards = asyncHandler(async (req, res) => {
    const scorecard = await Score.find({ username: req.params.name});

    if (!scorecard) {
        res.status(400);
        throw new Error('There are no scorecards');
    };

    res.status(200).json(scorecard);
});

module.exports = {
    getUserScorecards,
};