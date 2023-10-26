const { addUser, getAll, findByName } = require('../services/users')
// const usersService = require('../services/users')
// use : usersService.addUser(), usersService.getAll()

exports.findAll = (req, res) => {
    res.json(getAll())
}

// /users/:name => unique result => return object
// /users?name= => filter on collection => return array
exports.findByName = (req, res) => {
    const user = findByName(req.params.name)
    res.json(user)
}

exports.addUser = (req, res) => {
    addUser(req.body.name)
    res.status(201).send()
}