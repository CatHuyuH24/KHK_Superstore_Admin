const pool = require('../../config/database');
const productService = require('../product/productService');

/**
 * Get all mobilphones with filters applied and the total number of mobilephones.
 * Each record in the result set contains the following fields:
 * - id
 * - name
 * - brand
 * - price
 * - imageurl
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
 * @param {string} brand - Brand filter.
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
      const { totalCount, products } = await productService.getAllProductsOfManufacturerWithFilterAndCount(
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
      const query = `
      SELECT * 
      FROM products 
      WHERE id = $1
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
  } catch (error) {
      console.error('Error fetching mobilephone by ID', error);
      return [];
  }
}

/**
* Get related mobilephones, excluding the current mobilephone.
* 
* @param {number} currentId - The ID of the current mobilephone.
* @param {number} [limit=3] - The maximum number of related mobilephones to fetch. If not provided, by default is 3.
* @returns {Promise<Array>} - A list of related mobilephones.
* @example
* const relatedComputers = await getRelatedComputers(1, 3);
*/
async function getRelatedMobilephones(currentId, limit = 3) {
  try {
      const query = `
      SELECT p.id, p.name, m.manufacturer_name, p.price, p.imageurl, p.discount, p.numberofpro, t.category_name
      FROM products p JOIN categories t ON p.category_id = t.id
      JOIN manufacturers m ON p.manufacturer_id = m.id
      WHERE category_id = (SELECT id from categories where category_name = 'mobilephones')
      AND p.id <> $1
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

async function getAllMobilephoneBrands() {
  const brands = productService.getAllManufacturersOfCategory('mobilephones');
  return brands;
}

module.exports = {
  getAllMobilephonesWithFilterAndCount,
  getMobilephoneByID,
  getRelatedMobilephones,
  getAllMobilephoneBrands,
};
    