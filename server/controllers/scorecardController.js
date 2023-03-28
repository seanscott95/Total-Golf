const asyncHandler = require('express-async-handler');
const { Scorecard, Score } = require('../models')

// @desc Get scorecard
// @route GET /api/scores:id
// @access Private
const getScorecard = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.findById({ _id: req.params.id }).populate('score');

    if (!scorecard) {
        res.status(400);
        throw new Error('Scorecard not found');
    };
    res.status(200).json(scorecard);
});

// @desc Get ALL scorecards
// @route GET /api/scores
// @access Private
const getAllScorecards = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.find().populate('score');

    if (!scorecard) {
        res.status(400);
        throw new Error('There are no scorecards');
    };
    res.status(200).json(scorecard);
});

// @desc Create scorecard and scores
// @route POST /api/scores
// @access Private
const setScorecard = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error('Please fill out the form');
    };

    const { courseName, score, datePlayed, numberOfHoles } = req.body;
    
    const scoreList = await Score.insertMany(score);
    
    const scorecard = await Scorecard.create({
        courseName: courseName,
        numberOfHoles: numberOfHoles,
        score: scoreList.map((e) => e._id),
        datePlayed: datePlayed,
    });
    
    res.status(200).json(scorecard);
});

// @desc Update scorecard
// @route PUT /api/scores/:id
// @access Private
const updateScorecard = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.findById({ _id: req.params.id });
    if (!scorecard) {
        res.status(400);
        throw new Error('Scorecard not found');
    };

    const scorecardsToUpdate = req.body.score.map(async (e) => {
        return Score.findOneAndUpdate({ _id: e._id }, { $set: { ...e } });
    });

    await Promise.all(scorecardsToUpdate);

    const updatedScorecard = await Scorecard.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, }
    );
    res.status(200).json(updatedScorecard);
    
});

// @desc Deletes scorecard and scores collections
// @route DELETE /api/scores
// @access Private
const deleteScorecard = asyncHandler(async (req, res) => {
    const scorecard = await Scorecard.findById({ _id: req.params.id })
    
    const scoresToDelete = scorecard.score.map(async (e) => {
        return Score.findOneAndDelete({ _id: e._id });
    });
    
    await Promise.all(scoresToDelete);
    
    const deleteScorecard = await Scorecard.findOneAndDelete({ _id: req.params.id });

    if (!deleteScorecard) {
        res.status(400);
        throw new Error('Scorecard not found');
    };
    res.status(200).json({id: req.params.id});
});

module.exports = {
    getScorecard,
    getAllScorecards,
    setScorecard,
    updateScorecard,
    deleteScorecard,
}