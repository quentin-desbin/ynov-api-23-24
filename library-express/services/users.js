const reviewsService = require('./reviews')

const users = [
    {id: 1, firstName: "Jean", lastName: "Dupont"},
    {id: 2, firstName: "Michel", lastName: "Blanc"},
    {id: 3, firstName: "Pierre", lastName: "Marie"},
]

exports.getUsers = () => {
    return users
}

exports.getUserById = (id) => {
    return users.find(o => o.id === parseInt(id))
}

exports.addUser = (id, firstName, lastName) => {
    if (id != null && firstName != null && lastName != null) {
        const userById = module.exports.getUserById(id)
        if (!userById) {
            users.push({id, firstName, lastName})
            return true
        } else {
            throw new Error('A user with this id already exists')
        }
    } else {
        throw new Error('All parameters are required')
    }
}

exports.deleteUserById = function deleteUserBy(id) {
    const userIndex = users.findIndex(o => o.id === parseInt(id))
    if (userIndex > -1) {
        reviewsService.deleteReviewsForUser(id)
        users.splice(userIndex, 1)
        return true
    } else {
        throw new Error('User not found')
    }
}