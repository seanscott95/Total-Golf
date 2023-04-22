const asyncHandler = require('express-async-handler');
const { User } = require('../models')
const { signToken } = require('../utils/auth');

// @desc Get user
// @route GET /api/users
// @access Private
const getMe = (req, res) => {
    res.status(200).json(req.user);
};

// @desc Create user
// @route POST /api/users
// @access Public
const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    };

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    const user = await User.create({ username, email, password });
    const token = signToken(user);

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: token,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    };
});

// @desc Signin user
// @route POST /api/users/signin
// @access Public
const signinUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const correctPw = await user?.isCorrectPassword(password);

    if (!user || !correctPw) {
        res.status(400);
        throw new Error('Incorrect credentials');
    } else {
        const token = signToken(user);
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: token,
        });
    };
});

module.exports = {
    getMe,
    signupUser,
    signinUser
};