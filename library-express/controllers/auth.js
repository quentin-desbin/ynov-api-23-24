const jwt = require('jsonwebtoken');
const usersService = require('../services/db/users')
const createError = require('http-errors');
const { ServerError } = require('../errors');

exports.authMiddleware = async (req, res, next) => {

    if (req.headers && !req.headers.authorization) {
        res.status(401).json({success: false, message: 'You need to be authenticated'});
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodedToken = await jwt.verify(token, process.env.SECRET);
            if (decodedToken) {
                // We can store in req.locals = {} some info about the user to propagate into next controller
                next();
            } else {
                next(createError(401, 'Authentication is no more valid'))
            }
        } catch(e) {
            next(e);
        }
    }
}

exports.register = async (req, res, next) => {
    const {username, password, firstName, lastName} = req.body

    try {
        const user = await usersService.addUser(username, password, firstName, lastName)
        if (!user) {
            throw new ServerError('cannot register user')
        }
        return res.status(201).send()
    } catch(e) {
        return next(createError(e.statusCode, e.message))
    }
}

exports.login = async (req, res, next) => {
    const {username, password} = req.body

    try {
        const token = await usersService.login(username, password)
        if (token) {
            return res.status(200).json({success: true, token})
        }
        return res.status(400).json({success: false})
    } catch(e) {
        return next(createError(e.statusCode, e.message))
    }
}