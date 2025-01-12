const pool = require('../../config/database');
const productService = require('../../services/product/productService');

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

async function getAllMobilephoneManufacturers() {
  const manufacturers = productService.getAllManufacturersOfCategory('mobilephones');
  return manufacturers;
}


module.exports = {
  getAllMobilephonesWithFilterAndCount,
  getMobilephoneByID,
  getAllMobilephoneManufacturers,
};
    