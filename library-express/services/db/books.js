const { books } = require('../../models')

exports.getBooks = async () => {
    return await books.findAll()
}

exports.getBookById = async (id) => {
    return await books.findOne({
        where: {
            id
        }
    })
}

exports.addBook = (title, date) => {
    return books.create({title, date})
}

exports.deleteBookById = (id) => {
    return books.destroy({
        where: {
            id
        }
    })
}