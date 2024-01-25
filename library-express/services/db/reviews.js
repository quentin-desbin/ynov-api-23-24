const { reviews, users } = require('../../models')

exports.getAll = async () => {
    return reviews.findAll({
        include: [{
            model: users,
            as: 'user',
            attributes : ['username', 'firstName', 'lastName']
         }]
    })
}

exports.getReviewsForUser = async (userId) => {
    return reviews.findOne({
        where: {
            userId
        }
    })
}

exports.getReviewsForBook = async (bookId) => {
    return reviews.findOne({
        where: {
            bookId
        }
    })
}