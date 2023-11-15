const express = require('express'),
      router = express.Router(),
      { authMiddleware } = require('../controllers/login'),
      booksController = require('../controllers/books');

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBookById);
router.post('/', authMiddleware, booksController.addBook);
router.delete('/:id', booksController.deleteBookById);

module.exports = router;