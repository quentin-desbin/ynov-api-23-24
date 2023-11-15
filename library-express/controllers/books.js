const booksService = require('../services/books')
const createError = require('http-errors')

exports.getBooks = (req, res) => {
   const books = booksService.getBooks()
   res.set('Cache-Control', 'max-age=30') // Using client cache
   res.json({success: true, data: books})
}

exports.getBookById = (req, res, next) => {
   const book = booksService.getBookById(req.params.id)
   if (book) {
      res.json({success: true, data: book})
   } else {
      next(createError(404, "no book found for this id"))
   }
}

exports.addBook = (req, res, next) => {
   const bookCreated = booksService.addBook(req.body.title, req.body.date)
   if (bookCreated) {
      res.status(201).json({success: true, id: bookCreated.id})
   } else {
      next(createError(400, "Error when creating this book, verify your args"))
   }
}

exports.deleteBookById = (req, res, next) => {
   try {
      booksService.deleteBookById(req.params.id)
      res.status(204).send()
   } catch(e) {
      next(createError(404, `The book with id '${id}' doesn't exists, it cannot be deleted`))
   }
}