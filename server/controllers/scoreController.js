const asyncHandler = require('express-async-handler');
const { Score } = require('../models');

// @desc Get score
// @route GET /api/score
// @acess Private
const getScore = asyncHandler(async (req, res) => {
    const score = await Score.findById({ _id: req.params.id });

    if (!score) {
        res.status(400);
        throw new Error('Score not found');
    };
    res.status(200).json(score);
});

module.exports = {
    getScore,
}