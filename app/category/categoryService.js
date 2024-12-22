const pool = require("../../config/database");
const productService = require("../../services/product/productService.js");

/**
 * Get all products with filters applied, the total number of products, and the list of manufacturers.
 * Each record in the result set contains the following fields:
 * - id
 * - name
 * - manufacturer_name
 * - price (discounted price)
 * - image_url
 * - detail
 * - discount
 * - numberofpro (number of products)
 * - type_name (type of product)
 * 
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {number} page - Page number for pagination, expected to be greater than 0.
 * @param {number} limit - Number of items per page.
 * @param {string} sort - Sort order (column, direction). e.g. "id,ASC". If not provided, by default is random order.
 * @param {string} search - Search keyword.
 * @returns {Promise<Object>} - An object containing the total count of products, the list of products, and the list of manufacturers.
 * @returns {Array} return.products - List of products with discounted prices.
 * @returns {number} return.total - Total number of products matching the filters.
 * @returns {Array} return.manufacturers - List of manufacturers.
 * @example
 * const { products, total, manufacturers } = await getAllProductsWithFiltersAndCountAndManufacturers(0, 1000, 1, 10, "price,ASC", "Apple", "macbook");
 */
async function getAllProductsWithFiltersAndCountAndmanufacturers(minPrice, maxPrice, page, limit, sort, manufacturer, search) {
  try {
    // Ensure page is not less than 1
    page = Math.max(1, page);

    // product_type is not provided, which means 
    // we want to get all products 
    // and the total number of products 
    const {totalCount, products} = 
      await productService.getAllProductsOfCategoriesWithFilterAndCount
      (minPrice, maxPrice, page, limit, sort, manufacturer, search);
      
    // Get all manufacturers of all products (product_type is not provided)
    const manufacturersArray = await productService.getAllManufacturersOfCategory();

    return { products: products, total: totalCount, manufacturers: manufacturersArray };
  } catch (error) {
    console.error("Error fetching products of all categories:", error.message);
    return { result: [], total: 0, manufacturers: [] };
  }
}



async function getMobilePhoneById(id) {
  try {
    const query = 'SELECT * FROM products p JOIN categories c ON p.category_id =c.id WHERE id = $1 AND c.category_name = \'mobilephones\'';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching mobile phone:', error.message);
    return null;
  }
}

async function getComputerById(id) {
  try {
    const query = 'SELECT * FROM products p JOIN categories t ON p.category_id =t.id WHERE id = $1 AND t.category_name = \'computers\'';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching computer:', error.message);
    return null;
  }
}

async function getTelevisionById(id) {
  try {
    const query = 'SELECT * FROM products p JOIN categories t ON p.category_id =t.id WHERE id = $1 AND t.category_name = \'televisions\'';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching television:', error.message);
    return null;
  }
}

module.exports = {
  getAllProductsWithFiltersAndCountAndmanufacturers,
  getMobilePhoneById,
  getComputerById,
  getTelevisionById,
};