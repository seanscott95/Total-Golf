const { Schema, model } = require('mongoose');

const scorecardSchema = new Schema({
    courseName: {
        type: String,
        required: [true, 'Please add the course name'],
        trim: true,
    },
    score: [
        {
            name: {
                String,
                required: [true, 'Please add the players name'],
                trim: true,
            },
            firstNine: {
                Array,
                required: [true, 'Please add the score'],
            },
            lastNine: {
                Array,
                required: [true, 'Please add the score'],
            },
        }
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