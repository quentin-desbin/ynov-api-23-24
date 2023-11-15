const reviewsService = require('../../services/reviews.js')

it('should throw error when note is > 10', () => {
    // When/Then
    expect(() => {
        reviewsService.addReview(1, 1, 20)
    }).toThrow()
})