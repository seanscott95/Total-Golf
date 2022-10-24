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
            type: Number,
        },
        hole2: {
            type: Number,
        },
        hole3: {
            type: Number,
        },
        hole4: {
            type: Number,
        },
        hole5: {
            type: Number,
        },
        hole6: {
            type: Number,
        },
        hole7: {
            type: Number,
        },
        hole8: {
            type: Number,
        },
        hole9: {
            type: Number,
        },
    },
    lastNine: {
        hole10: {
            type: Number,
        },
        hole11: {
            type: Number,
        },
        hole12: {
            type: Number,
        },
        hole13: {
            type: Number,
        },
        hole14: {
            type: Number,
        },
        hole15: {
            type: Number,
        },
        hole16: {
            type: Number,
        },
        hole17: {
            type: Number,
        },
        hole18: {
            type: Number,
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