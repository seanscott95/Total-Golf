const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please add the players username'],
    },
    // Username relation has not been set up, for future development
    // username: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, 'Please add the players username'],
    // },
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