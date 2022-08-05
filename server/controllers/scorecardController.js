const asyncHandler = require('express-async-handler');

// @decription Get scorecard
// @route GET /api/scores
// @acess Private
const getScorecard = asyncHandler(async (req, res) => {
    res.status(200).json({ massage: 'Get scores'});
});

// @decription Set scorecard
// @route POST /api/scores
// @acess Private
const setScorecard = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Create Scorecard'});
});

// @decription Update scorecard
// @route PUT /api/scores/:id
// @acess Private
const updateScorecard = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Scorecard ${req.params.id}`});
});

// @decription Delete scorecard
// @route DELETE /api/scores
// @acess Private
const deleteScorecard = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Scorecard ${req.params.id}`});
});

module.exports = {
    getScorecard,
    setScorecard,
    updateScorecard,
    deleteScorecard
}