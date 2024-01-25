const { books } = require('../../models')

exports.getBooks = async () => {
    return books.findAll()
}

exports.getBookById = async (id) => {
    return books.findOne({
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