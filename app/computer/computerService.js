const pool = require('../../config/database');
const productService = require('../../services/product/productService');

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
 * @param {string} startDate - start date
 * @param {string} endDate - end date
 * @param {number} fps - frame fresh rate
 * @returns {Promise<Object>} - An object containing the total count of computers and the list of computers.
 * @returns {number} return.totalCount - Total number of computers matching the filters.
 * @returns {Array} return.products - Array of computers.
 * @example
 * const { totalCount, products } = await getAllComputersWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Apple", "macbook");
 */
async function getAllComputersWithFilterAndCount(minPrice, maxPrice, page, limit, sort, manufacturer, search, startDate, endDate, fps) {
  try {
      page = Math.max(1, page);
      const { totalCount, products } = await productService.getAllProductsOfCategoriesWithFilterAndCount(
          minPrice, maxPrice, page, limit, sort, manufacturer, search, 'computers', startDate, endDate, fps
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


async function getAllComputerManufacturers() {
  const manufacturers = productService.getAllManufacturerNamesOfCategory('computers');
  return manufacturers;
}

module.exports = {
    getAllComputersWithFilterAndCount,
    getComputerByID,
    getAllComputerManufacturers,
};
    