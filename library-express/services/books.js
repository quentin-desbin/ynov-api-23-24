const books = [
    {id: 1, title: "My book", date: "13/11/2023"},
    {id: 2, title: "My 2nd book", date: "14/11/2023"},
    {id: 3, title: "My 3rd book", date: "14/11/2023"}
]

exports.getBooks = () => {
    return books
}

exports.getBookById = (id) => {
    return books.find(o => o.id === parseInt(id)) // To be sure we have number here
}

exports.addBook = (title, date) => {
    books.push({
        id: books.length,
        title,
        date
    })
    return true
}

exports.deleteBookById = (id) => {
    const bookIndex = this.getBooks().findIndex(o => o.id === parseInt(id)) // To be sure we have number here
    if (bookIndex > -1) {
        books.splice(bookIndex, 1)
    }
    throw new Error('Cannot delete because not found')
}