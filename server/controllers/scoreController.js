const asyncHandler = require('express-async-handler');
const { Score } = require('../models');

// @desc Get score
// @route GET /api/score
// @access Private
const getScore = asyncHandler(async (req, res) => {
    const score = await Score.findById({ _id: req.params.id });

    if (!score) {
        res.status(400);
        throw new Error('Score not found');
    };
    res.status(200).json(score);
});

// @desc Update score
// @route PUT /api/score
// @access Private
const updateScore = asyncHandler(async (req, res) => {
    const score = await Score.findById({ _id: req.params.id });

    if (!score) {
        res.status(400);
        throw new Error('Score not found');
    };

    const updateScore = await Score.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    
    res.status(200).json(updateScore);
});

const deleteScore = asyncHandler(async (req, res) => {
    const deleteScore = await Score.findOneAndDelete({ _id: req.params.id });

    if (!deleteScore) {
        res.status(400);
        throw new Error('Score not found');
    };

    res.status(200).json(deleteScore);
})

module.exports = {
    getScore,
    updateScore,
    deleteScore
}