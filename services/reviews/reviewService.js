const pool = require('../../config/database');

async function getReviewsByProductId(productId) {
  try {
    // even if the user is not active/ is admin, we still want to show their reviews?
    // need to discuss this with the team
    const result = await pool.query(
      `SELECT 
        r.id, 
        r.rating, 
        r.created_at, 
        r.comment,
        u.username
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC`,
      [productId]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    getReviewsByProductId,
};
