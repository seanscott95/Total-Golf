const asyncHandler = require('express-async-handler');
const { User } = require('../models')

// @desc Get user
// @route GET /api/users
// @acess Private
const getMe = asyncHandler(async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
});

// @desc Create user
// @route POST /api/users
// @acess Public
const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !!email || !!password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    };

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    const user = await User.create(req.body);
    res.status(200).json(user);
});

// @desc Login user
// @route POST /api/users/login
// @acess Public
const loginUser = asyncHandler(async (req, res) => {
    const user = User.findOne({ _id: req.body.params});
    if (!user) {
        throw new Error('No user found');
    };
    res.status(200).json(user);
});

module.exports = {
    getMe,
    signupUser,
    loginUser
}