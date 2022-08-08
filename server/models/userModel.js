const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please add a name'],
        unique: [true, 'Username already exists'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, 'Email already exists'],
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        trim: true,
    },
},
{
    timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;