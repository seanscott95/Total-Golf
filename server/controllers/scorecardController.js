const asyncHandler = require('express-async-handler');
const { Scorecard, Score } = require('../models')

// @desc Get scorecard
// @route GET /api/scores
// @acess Private
const getScorecard = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.findById({ _id: req.params.id }).populate('score');

    if (!scorecard) {
        res.status(400);
        throw new Error('Scorecard not found');
    };
    res.status(200).json(scorecard);
});

// @desc Create scorecard and scores
// @route POST /api/scores
// @acess Private
const setScorecard = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error('Please fill out the form');
    };

    const score = await Score.insertMany(req.body.score);

    const scorecard = await Scorecard.create({
        courseName: req.body.courseName,
        score: score.map((e) => e),
        datePlayed: req.body.datePlayed,
    });

    res.status(200).json(scorecard);
});

// @desc Update scorecard
// @route PUT /api/scores/:id
// @acess Private
const updateScorecard = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.findById({ _id: req.params.id });
    if (!scorecard) {
        res.status(400);
        throw new Error('Scorecard not found');
    };

    const exercisesToUpdate = req.body.score.map(async (e) => {
        return Score.findOneAndUpdate({ _id: e._id }, { $set: { ...e } });
    });

    await Promise.all(exercisesToUpdate);

    const updatedScorecard = await Scorecard.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, }
    );
    res.status(200).json(updatedScorecard);

});

// @desc Delete scorecard
// @route DELETE /api/scores
// @acess Private
const deleteScorecard = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.findOneAndDelete({ _id: req.params.id });

    if (!scorecard) {
        res.status(400);
        throw new Error('Scorecard not found');
    };
    res.status(200).json({ message: 'Deleted scorecard', id: req.params.id });
});

module.exports = {
    getScorecard,
    setScorecard,
    updateScorecard,
    deleteScorecard
}