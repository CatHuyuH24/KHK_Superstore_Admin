const pool = require("../../config/database");
const productsService = require("../product/productService");
const {calculateDiscountedPrice} = require("../Utils/discountedPriceUtils.js");

/**
 * Get all products with filters applied, the total number of products, and the list of brands.
 * Each record in the result set contains the following fields:
 * - id
 * - name
 * - brand
 * - price (discounted price)
 * - imageurl
 * - detail
 * - discount
 * - numberofpro (number of products)
 * - type_name (type of product)
 * 
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {number} page - Page number for pagination, expected to be greater than 0.
 * @param {number} limit - Number of items per page.
 * @param {string} sort - Sort order (column, direction). e.g. "id,ASC".
 * @param {string} brand - Brand filter.
 * @param {string} search - Search keyword.
 * @returns {Promise<Object>} - An object containing the total count of products, the list of products, and the list of brands.
 * @returns {Array} return.products - List of products with discounted prices.
 * @returns {number} return.total - Total number of products matching the filters.
 * @returns {Array} return.brands - List of brands.
 * @example
 * const { products, total, brands } = await getAllProductsWithFiltersAndCountAndBrands(0, 1000, 1, 10, "price,ASC", "Apple", "macbook");
 */
async function getAllProductsWithFiltersAndCountAndBrands(minPrice, maxPrice, page, limit, sort, brand, search) {
  try {
    // Ensure page is not less than 1
    page = Math.max(1, page);

    // product_type is not provided, which means 
    // we want to get all products 
    // and the total number of products 
    const {totalCount, products} = 
      await productsService.getAllProductsOfTypeWithFilterAndCount
      (minPrice, maxPrice, page, limit, sort, brand, search);
      
    // Get all brands of all products (product_type is not provided)
    const brandsArray = await productsService.getAllBrandsOfType();

    return { products: products, total: totalCount, brands: brandsArray };
  } catch (error) {
    console.error("Error fetching products of all categories:", error.message);
    return { result: [], total: 0, brands: [] };
  }
}



async function getMobilePhoneById(id) {
  try {
    const query = 'SELECT * FROM mobilephones WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching mobile phone:', error.message);
    return null;
  }
}

async function getComputerById(id) {
  try {
    const query = 'SELECT * FROM computers WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching computer:', error.message);
    return null;
  }
}

async function getTelevisionById(id) {
  try {
    const query = 'SELECT * FROM televisions WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching television:', error.message);
    return null;
  }
}

module.exports = {
  getAllProductsWithFiltersAndCountAndBrands,
  getMobilePhoneById,
  getComputerById,
  getTelevisionById,
};


