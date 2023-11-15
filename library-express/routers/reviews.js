const express = require('express'),
      router = express.Router(),
      reviewsController = require('../controllers/reviews');

router.get('/', reviewsController.getReviews);
router.post('/', reviewsController.addReview);
router.delete('/:bookId', reviewsController.deleteReviewsForBook);

module.exports = router;