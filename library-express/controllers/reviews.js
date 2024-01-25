const reviewsService = require('../services/db/reviews')
const usersService = require('../services/users')
const booksService = require('../services/books')

exports.getReviews = async (req, res) => {
   const reviews = await reviewsService.getAll()
   res.json({success: true, data: reviews})
}

// Example of "what should not be present on controller" and what is bad
exports.addReview = async (req, res) => {
   if (req.body && req.body.userId && req.body.bookId && req.body.note) {
      const user = usersService.getUserById(req.body.userId)
      const book = await booksService.getBookById(req.body.bookId)
      try {
         if (user && book) {
            reviewsService.addReview(req.body.userId, req.body.bookId, req.body.note)
            res.status(201).json({success: true, message: 'Review added'})
         } else {
            res.status(400).json({success: false, message: 'Book and User must exist to add a review'})
         }
      } catch (e) {
         res.status(400).json({success: false, message: 'Review cannot be added', error: e.message})
      }
   } else {
      res.status(400).json({success: false, message: 'All args are required'})
   }
}

exports.deleteReviewsForBook = (req, res) => {
   if (req.params.bookId) {
      const book = booksService.getBookById(req.params.bookId)
      if (book) {
         reviewsService.deleteReviewsForBook(req.params.bookId)
         res.json({success: true, message: 'Reviews deleted for this book'})
      } else {
         res.status(404).json({success: false, message: `The book with id ${req.params.bookId} doesn't exists, reviews cannot be deleted`})
      }
   } else {
      res.status(400).json({success: false, message: 'The bookId is required'})
   }
}