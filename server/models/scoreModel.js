const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add the players username'],
    },
    firstNine: {
        type: Array,
        required: [true, 'Please add the score'],
    },
    lastNine: {
        type: Array,
        required: [true, 'Please add the score'],
    },
},
    {
        timestamps: true,
    }
);

const Score = model('Score', scoreSchema);

module.exports = Score;