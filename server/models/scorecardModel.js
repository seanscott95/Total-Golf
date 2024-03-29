const { Schema, model } = require('mongoose');

const scorecardSchema = new Schema({
    courseName: {
        type: String,
        required: [true, 'Please add the course name'],
        trim: true,
    },
    numberOfHoles: {
        type: String,
        required: [true, 'Please add the numbers of holes played'],
    },
    score: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Score',
        },
    ],
    datePlayed: {
        type: Date,
        required: [true, 'Please add the date'],
    },
}, {
    timestamps: true,
});

const Scorecard = model('Scorecard', scorecardSchema);

module.exports = Scorecard;