const db = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { NotFound, NotLogged } = require('../../errors')

exports.getUsers = async () => {
    return await db.users.findAll({attributes: {exclude: ['password']}});
}

exports.getUserByUsername = async (username) => {
    return await db.users.findOne({
        where: {
            username
        }
    });
}

exports.addUser = async (username, password, firstName, lastName) => {
    const existingUser = await this.getUserByUsername(username)
    if (existingUser) {
        throw new Error('user already exists')
    }
    return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)).then((hash) => {
        return db.users.create({username, password: hash, firstName, lastName})
    })
}

exports.login = async (username, password) => {
    const user = await db.users.findOne({
        where: {username: username}
    });
    if (user) {
        const verifiedUser = await bcrypt.compare(password, user.password);
        if (verifiedUser) {
            const token = jwt.sign({
                data: {id: user.id, username: user.username}
            }, process.env.SECRET, {
                expiresIn: '30s'
            })
            return token
        } else {
            throw new NotLogged('password incorrect for username')
        }
    } else {
        throw new NotFound('no user found for username : ' + username)
    }
}