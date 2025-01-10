const pool = require('../../config/database');

async function getReviewsByProductId(productId) {
  try {
    const result = await pool.query(
      `SELECT 
        (SELECT AVG(rating) FROM reviews WHERE product_id = $1) AS review_average,
        (SELECT COUNT(DISTINCT user_id) FROM reviews WHERE product_id = $1) AS review_count,
        r.id, 
        r.rating, 
        r.created_at, 
        r.comment,
        u.username,        
        COUNT(*) OVER() AS total_count
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC`,
      [productId]
    );

    const reviews = result.rows;
    const reviewAverage = result.rows[0]? result.rows[0].review_average : null;
    const reviewerCount = result.rows[0]? result.rows[0].review_count : 0;
    const totalCount = result.rows[0]? result.rows[0].total_count : 0;
    
    return {
      reviews,
      reviewAverage,
      reviewerCount,
      totalCount,
    };
  } catch (error) {
    console.error('Error fetching reviews by product ID:', error);
    throw error;
  }
}

module.exports = {
  getReviewsByProductId,
};

module.exports = {
    getReviewsByProductId,
};
