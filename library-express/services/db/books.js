const db = require('../../models');

exports.getBooks = async () => {
    return await db.books.findAll();
}

exports.getBookById = async (id) => {
    return await db.books.findOne({
        where: {
            id
        }
    });
}

exports.addBook = (title, date) => {
    return db.books.create({title, date});
}

exports.deleteBookById = (id) => {
    return db.books.destroy({
        where: {
            id
        }
    });
}