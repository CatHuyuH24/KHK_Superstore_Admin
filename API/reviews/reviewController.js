const reviewService = require('../../services/reviews/reviewService');
const {StatusCodes} = require('http-status-codes')
async function addReview(req, res) {
    try {
        const { user_id, product_id, rating, comment } = req.body;
        const reviewAdded = await reviewService.addReview(product_id, user_id, rating, comment);
        if (reviewAdded) {
            return res.status(StatusCodes.CREATED).json({"review_added":reviewAdded, "message": "Thanks for your review!"});
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
        }
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
}

module.exports = {
    addReview,
};
