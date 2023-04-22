const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
    authMiddleware: asyncHandler(async (req, res, next) => {

        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = token.split(' ').pop().trim();
        };

        if (!token) {
            res.status(401);
            throw new Error('Not authorised');
        };

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
            next();
        } catch (error) {
            console.log('Invalid token. Error:', error);
            res.status(401);
            throw new Error("Not authorised");
        };
    }),
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};