const jwt = require('jsonwebtoken');
const usersService = require('../services/db/users')
const createError = require('http-errors')

exports.authMiddleware = async (req, res, next) => {
    // When test environment, we need to disabled auth
    if (process.env.JEST_WORKER_ID !== undefined) {
        next()
        return;
    }
    if (req.headers && !req.headers.authorization) {
        res.status(401).json({success: false, message: 'You need to be authenticated'});
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodedToken = await jwt.verify(token, process.env.SECRET);
            if (decodedToken) {
                next();
            } else {
                res.status(401).json({success: false, message: 'This authentication is no more valid'});
            }
        } catch(e) {
            next(e);
        }
    }
}

exports.register = async (req, res, next) => {
    const {username, password, firstName, lastName} = req.body

    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'All inputs are mandatory!' });
    }
    try {
        const user = await usersService.addUser(username, password, firstName, lastName)
        if (!user) {
            return next(createError(500, 'cannot register user'))
        }
        return res.status(201).send()
    } catch(e) {
        next(createError(400, e.message))
    }
}

exports.login = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'username & password are mandatory' });
    }

    try {
        const token = await usersService.login(username, password)
        if (token) {
            return res.status(200).json({success: true, token})
        }
    } catch(e) {
        return next(createError(e.statusCode, e.message))
    }
}