const pool = require('../../config/database');
const productService = require('../../services/product/productService');
const reviewService = require('../../services/reviews/reviewService');

/**
 * Get all mobilphones with filters applied and the total number of mobilephones.
 * Each record in the result set contains the following fields:
 * - id
 * - name
 * - manufacturer_name
 * - price
 * - image_url
 * - detail
 * - discount
 * - numberofpro (number of products)
 * - type_name (type of product)
 * - total_count (total number of products matching the filters)
 * 
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {number} page - Page number for pagination, expected to be greater than 0.
 * @param {number} limit - Number of items per page.
 * @param {string} sort - Sort order (column, direction). e.g. "id,ASC". If not provided, by default is random order.
 * @param {string} manufacturer - Manufacturer filter.
 * @param {string} search - Search keyword.
 * @returns {Promise<Object>} - An object containing the total count of mobilephones and the list of mobilephones.
 * @returns {number} return.totalCount - Total number of mobilephones matching the filters.
 * @returns {Array} return.products - Array of mobilephones.
 * @example
 * const { totalCount, products } = await getAllComputersWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Apple", "macbook");
 */
async function getAllMobilephonesWithFilterAndCount(minPrice, maxPrice, page, limit, sort, manufacturer, search) {
  try {
      page = Math.max(1, page);
      const { totalCount, products } = await productService.getAllProductsOfCategoriesWithFilterAndCount(
          minPrice, maxPrice, page, limit, sort, manufacturer, search, 'mobilephones'
      );
      
      return { totalCount, products };
  } catch (error) {
      console.error('Error fetching all mobilephones', error);
      return { totalCount: 0, products: [] };
  }
}

/**
 * Get a mobilephone by its ID.
 * 
 * @param {number} id - The ID of the mobilephone.
 * @returns {Promise<Object>} - The mobilephone object if found, otherwise an empty array.
 * @example
 * const mobilephone = await getComputerByID(1);
 */
async function getMobilephoneByID(id) {
  try {
      const mobilephone = productService.getProductById(id);
      return mobilephone;
  } catch (error) {
      console.error('Error fetching mobilephone by ID', error);
      return [];
  }
}

/**
 * Get related mobilephones, excluding the current mobilephone.
 * 
 * @param {number} currentId - The ID of the current mobilephone.
 * @param {number} [limit=6] - The maximum number of related mobilephones to fetch. If not provided, the default is 6.
 * @returns {Promise<Array>} - A list of related mobilephones.
 * @example
 * const relatedMobilephones = await getRelatedMobilephones(1, 6);
 */
async function getRelatedMobilephones(currentId, limit = 6) {
  try {
      const query = `
      SELECT p.id, p.name, p.image_url, p.number, p.price, p.discount, 
            c.category_name, m.manufacturer_name, COUNT(DISTINCT r.user_id) AS reviewer_count, AVG(r.rating) AS review_average
      FROM products p JOIN categories c ON p.category_id = c.id
      LEFT JOIN reviews r on r.product_id = p.id
      JOIN manufacturers m ON p.manufacturer_id = m.id
      WHERE category_id = (SELECT id from categories where category_name = 'mobilephones')
      AND p.id <> $1
      GROUP BY 
                p.id, 
                p.name, 
                p.image_url, 
                p.number, 
                p.price, 
                p.discount, 
                m.id, 
                c.id, 
                m.manufacturer_name, 
                c.category_name
      ORDER BY RANDOM() 
      LIMIT $2
      `;
      const result = await pool.query(query, [currentId, limit]);
      return result.rows;
  } catch (error) {
      console.error('Error fetching related mobilephones', error);
      return [];
  }
}

async function getAllMobilephoneManufacturers() {
  const manufacturers = productService.getAllManufacturersOfCategory('mobilephones');
  return manufacturers;
}

async function getReviewsInfoOfMobilephoneById(productId, page, limit) {
  const {reviews, reviewAverage, reviewerCount, totalCount} 
        = await reviewService.getReviewsByProductId(productId, page, limit);
  return {reviews, reviewAverage, reviewerCount, totalCount};
}

module.exports = {
  getAllMobilephonesWithFilterAndCount,
  getMobilephoneByID,
  getRelatedMobilephones,
  getAllMobilephoneManufacturers,
  getReviewsInfoOfMobilephoneById,
};
    