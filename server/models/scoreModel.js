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
        hole1: {
            type: String,
        },
        hole2: {
            type: String,
        },
        hole3: {
            type: String,
        },
        hole4: {
            type: String,
        },
        hole5: {
            type: String,
        },
        hole6: {
            type: String,
        },
        hole7: {
            type: String,
        },
        hole8: {
            type: String,
        },
        hole9: {
            type: String,
        },
    },
    lastNine: {
        hole10: {
            type: String,
        },
        hole11: {
            type: String,
        },
        hole12: {
            type: String,
        },
        hole13: {
            type: String,
        },
        hole14: {
            type: String,
        },
        hole15: {
            type: String,
        },
        hole16: {
            type: String,
        },
        hole17: {
            type: String,
        },
        hole18: {
            type: String,
        },
    },
    total: {
        type: Number,
    },

},
    {
        timestamps: true,
    }
);

const Score = model('Score', scoreSchema);

module.exports = Score;