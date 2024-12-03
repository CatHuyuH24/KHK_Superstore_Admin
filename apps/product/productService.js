const pool = require('../../config/database');
const { prepareFilterStatements } = require('../Utils/filterStatementUtils');

/**
 * Get all products of a specific category with filters applied and the total number of products.
 * Each record in the result set contains the following fields:
 * - id
 * - name
 * - manufacturer
 * - price
 * - imageurl
 * - detail
 * - discount
 * - number (number of products)
 * - category_name
 * - total_count (total number of products matching the filters)
 *
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {number} page - Page number for pagination, expected to be greater than 0.
 * @param {number} limit - Number of items per page.
 * @param {string} sort- Sort order (column, direction). e.g. "id,ASC". If not provided, by default is random order.
 * @param {string} manufacturer - manufacturer filter.
 * @param {string} search - Search keyword.
 * @param {string} products_category - category of products. e.g. "computers". If not provided, all products will be fetched.
 * @returns {Promise<Object>} An object containing the total count of products and the array of products.
 * @returns {number} return.totalCount - Total number of products matching the filters.
 * @returns {Array} return.products - Array of products.
 * @example
 * const {totalCount, products} = await getAllProductsOfmanufacturerWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Apple", "macbook", "computers");
 */
async function getAllProductsOfCategoryWithFilterAndCount(
  minPrice,
  maxPrice,
  page,
  limit,
  sort,
  manufacturer,
  search,
  products_category
) {
  try {
    const {
      priceFilter, 
      manufacturerFilter, 
      searchFilter, 
      sortFilter, 
      productsCategoryFilter,
    } = prepareFilterStatements(
      minPrice,
      maxPrice,
      sort,
      manufacturer,
      search,
      products_category
    );

    const result = await pool.query(
      `
            SELECT p.*, m.manufacturer_name, c.category_name, count(*) over() as total_count 
            FROM products p 
            JOIN categories c ON p.category_id = c.id
            JOIN manufacturers m ON p.manufacturer_id = m.id
            WHERE 1=1
            ${productsCategoryFilter}
            ${searchFilter}
            ${manufacturerFilter}
            ${priceFilter}
            ${sortFilter}
            LIMIT $1 OFFSET $2`,
      [limit, (page - 1) * limit]
    );

    let count = 0;
    if(result.rows.length > 0){
      count = parseInt(result.rows[0].total_count);
    }

    return {
      totalCount: count,
      products: result.rows,
    };
  } catch (error) {
    console.error(
      `Error fetching ${products_category} products with filter and count:`,
      error.message
    );
    return { totalCount: 0, products: [] };
  }
}

/**
 * Get all manufacturers of a specific product category.
 *
 * @param {string} products_category category of products, e.g. "computers". If not provided, categories of all products will be fetched. e.g. "computers".
 * @returns {Promise<Array>} An array of manufacturers.
 */
async function getAllManufacturersOfCategory(products_category) {
  let productsCategoryFilter = '';
  if (products_category != null)
    productsCategoryFilter = `WHERE category_id = (SELECT id from categories where category_name = '${products_category}')`;

  const manufacturersList = await pool.query(`
        SELECT DISTINCT(m.manufacturer_name) 
        FROM products p
        JOIN manufacturers m ON p.manufacturer_id = m.id
        ${productsCategoryFilter}
        `);

  const manufacturers = manufacturersList.rows.map((row) => row.manufacturer);
  return manufacturers;
}

module.exports = {
  getAllProductsOfCategoryWithFilterAndCount,
  getAllManufacturersOfCategory,
};
