const asyncHandler = require('express-async-handler');
const Scorecard = require('../models/scorecardModel');

// @decription Get scorecard
// @route GET /api/scores
// @acess Private
const getScorecard = asyncHandler(async (req, res) => {
    const score = await Scorecard.find();
    res.status(200).json(score);
});

// @decription Set scorecard
// @route POST /api/scores
// @acess Private
const setScorecard = asyncHandler(async (req, res) => {
    if (!req.body.score) {
        res.status(400);
        throw new Error('Please fill out the form');
    };

    const score = await Scorecard.create(req.body);
    res.status(200).json(score);
});

// @decription Update scorecard
// @route PUT /api/scores/:id
// @acess Private
const updateScorecard = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.findById(req.params.id)

    if (!scorecard) {
        res.status(400);
        throw new Error('Scorecard not found');
    }
    const updatedScorecard = await Scorecard.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedScorecard);
});

// @decription Delete scorecard
// @route DELETE /api/scores
// @acess Private
const deleteScorecard = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.findOneAndDelete({ _id: req.params.id });

    if (!scorecard) {
        res.status(400);
        throw new Error('Scorecard not found');
    };
    res.status(200).json({ message: 'Deleted scorecard', id: req.params.id});
});

module.exports = {
    getScorecard,
    setScorecard,
    updateScorecard,
    deleteScorecard
}