const { users } = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { NotFound, NotLogged, BadRequest, ServerError } = require('../../errors')

exports.getUsers = async () => {
    return await users.findAll({attributes: {exclude: ['password']}})
}

exports.getUserByUsername = async (username) => {
    return await users.findOne({
        where: {
            username
        }
    })
}

exports.addUser = async (username, password, firstName, lastName) => {
    const existingUser = await this.getUserByUsername(username)
    if (existingUser) {
        throw new BadRequest('user already exists')
    }
    return bcrypt.hash(password, 10).then((hash) => {
        return users.create({username, password: hash, firstName, lastName})
    }).catch((e) => {
        throw new ServerError('Error when performing bcrypt: ', e.message)
    })
}

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username)
    if (!user) {
        throw new NotFound('no user found for username: ' + username)
    }

    const verifiedUser = await bcrypt.compare(password, user.password)
    if (!verifiedUser) {
        throw new NotLogged('password incorrect for username')
    }
    
    const token = jwt.sign({
        data: {id: user.id, username: user.username}
    }, process.env.SECRET, {
        expiresIn: '30s'
    })
    return token
}