const pool = require('../../config/database');
const productService = require('../product/productService');

/**
 * Get all computers with filters applied and the total number of computers.
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
 * @returns {Promise<Object>} - An object containing the total count of computers and the list of computers.
 * @returns {number} return.totalCount - Total number of computers matching the filters.
 * @returns {Array} return.products - Array of computers.
 * @example
 * const { totalCount, products } = await getAllComputersWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Apple", "macbook");
 */
async function getAllComputersWithFilterAndCount(minPrice, maxPrice, page, limit, sort, manufacturer, search) {
  try {
      page = Math.max(1, page);
      const { totalCount, products } = await productService.getAllProductsOfCategoriesWithFilterAndCount(
          minPrice, maxPrice, page, limit, sort, manufacturer, search, 'computers'
      );
      
      return { totalCount, products };
  } catch (error) {
      console.error('Error fetching all computers', error);
      return { totalCount: 0, products: [] };
  }
}

/**
 * Get a computer by its ID.
 * 
 * @param {number} id - The ID of the computer.
 * @returns {Promise<Object>} - The computer object if found, otherwise an empty array.
 * @example
 * const computer = await getComputerByID(1);
 */
async function getComputerByID(id) {
  try {
      const computer = productService.getProductById(id);
      return computer;
  } catch (error) {
      console.error('Error fetching computer by ID', error);
      return [];
  }
}

/**
* Get related computers, excluding the current computer.
* 
* @param {number} currentId - The ID of the current computer.
* @param {number} [limit=3] - The maximum number of related computers to fetch. If not provided, by default is 3.
* @returns {Promise<Array>} - A list of related computers.
* @example
* const relatedComputers = await getRelatedComputers(1, 3);
*/
async function getRelatedComputers(currentId, limit = 3) {
  try {
      const query = `
      SELECT p.*, c.category_name, m.manufacturer_name
      FROM products p JOIN categories c ON p.category_id = c.id
      JOIN manufacturers m ON p.manufacturer_id = m.id
      WHERE category_id = (SELECT id from categories where category_name = 'computers')
      AND p.id <> $1
      ORDER BY RANDOM() 
      LIMIT $2
      `;
      const result = await pool.query(query, [currentId, limit]);
      return result.rows;
  } catch (error) {
      console.error('Error fetching related computers', error);
      return [];
  }
}

async function getAllComputerManufacturers() {
  const manufacturers = productService.getAllManufacturersOfCategory('computers');
  return manufacturers;
}

module.exports = {
    getAllComputersWithFilterAndCount,
    getComputerByID,
    getRelatedComputers,
    getAllComputerManufacturers,
};
    