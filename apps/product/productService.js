const pool = require('../../config/database');
const { prepareFilterStatements } = require('../Utils/filterStatementUtils');

/**
 * Get all products of a specific manufacturer with filters applied and the total number of products.
 * Each record in the result set contains the following fields:
 * - id
 * - name
 * - manufacturer
 * - price
 * - imageurl
 * - detail
 * - discount
 * - numberofpro (number of products)
 * - manufacturer_name (manufacturer of product)
 * - total_count (total number of products matching the filters)
 *
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {number} page - Page number for pagination, expected to be greater than 0.
 * @param {number} limit - Number of items per page.
 * @param {string} sort- Sort order (column, direction). e.g. "id,ASC". If not provided, by default is random order.
 * @param {string} manufacturer - manufacturer filter.
 * @param {string} search - Search keyword.
 * @param {string} products_manufacturer - manufacturer of products. e.g. "computers". If not provided, all products will be fetched.
 * @returns {Promise<Object>} An object containing the total count of products and the array of products.
 * @returns {number} return.totalCount - Total number of products matching the filters.
 * @returns {Array} return.products - Array of products.
 * @example
 * const {totalCount, products} = await getAllProductsOfmanufacturerWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Apple", "macbook", "computers");
 */
async function getAllProductsOfManufacturerWithFilterAndCount(
  minPrice,
  maxPrice,
  page,
  limit,
  sort,
  manufacturer,
  search,
  products_manufacturer
) {
  try {
    const {
      priceFilter,
      manufacturerFilter,
      searchFilter,
      sortFilter,
      productsManufacturerFilter,
    } = prepareFilterStatements(
      minPrice,
      maxPrice,
      sort,
      manufacturer,
      search,
      products_manufacturer
    );

    const result = await pool.query(
      `
            SELECT p.*, m.manufacturer_name, b.manufacturer_name, count(*) over() as total_count 
            FROM products p 
            JOIN manufacturers b ON p.manufacturer_id = b.id
            JOIN manufacturers m ON p.manufacturer_id = m.id
            WHERE 1=1
            ${productsManufacturerFilter}
            ${searchFilter}
            ${manufacturerFilter}
            ${priceFilter}
            ${sortFilter}
            LIMIT $1 OFFSET $2`,
      [limit, (page - 1) * limit]
    );

    const count = result.rows[0].total_count
      ? parseInt(result.rows[0].total_count)
      : 0;

    return {
      totalCount: count,
      products: result.rows,
    };
  } catch (error) {
    console.error(
      `Error fetching ${products_manufacturer} products:`,
      error.message
    );
    return { totalCount: 0, products: [] };
  }
}

/**
 * Get all manufacturers of a specific product manufacturer.
 *
 * @param {string} products_category manufacturer of products, e.g. "computers". If not provided, manufacturers of all products will be fetched. e.g. "computers". If not provided, manufacturers of all products will be fetched.
 * @returns {Promise<Array>} An array of manufacturers.
 */
async function getAllManufacturersOfCategory(products_category) {
  let productsManufacturerFilter = '';
  if (products_category != null)
    productsManufacturerFilter = `WHERE manufacturer_id = (SELECT id from categories where category_name = '${products_category}')`;

  const manufacturersList = await pool.query(`
        SELECT DISTINCT(m.manufacturer_name) 
        FROM products p
        JOIN manufacturers m ON p.manufacturer_id = m.id
        ${productsManufacturerFilter}
        `);

  const manufacturers = manufacturersList.rows.map((row) => row.manufacturer);
  return manufacturers;
}

/**
 * Count all products of a specific manufacturer with filters applied.
 *
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {string} sort - Sort order (column, direction). e.g. "id,ASC". If not provided, by default is random order.
 * @param {string} manufacturer - manufacturer filter.
 * @param {string} search - Search keyword.
 * @param {string} products_manufacturer - manufacturer of products.
 * @returns {Promise<number>} Total count of products.
 */
async function countAllProductsOfManufacturerWithFilters(
  minPrice,
  maxPrice,
  sort,
  manufacturer,
  search,
  products_manufacturer
) {
  const {
    priceFilter,
    manufacturerFilter,
    searchFilter,
    sortFilter, // no need to used here because we are counting
    productsManufacturerFilter,
  } = prepareFilterStatements(
    minPrice,
    maxPrice,
    sort,
    manufacturer,
    search,
    products_manufacturer
  );

  //no need to sort
  const totalResult = await pool.query(
    `SELECT COUNT(*) 
        FROM products 
        WHERE 1=1 
        ${productsManufacturerFilter}
        ${searchFilter}
        ${manufacturerFilter}
        ${priceFilter}
        ;`
  );
  const total = parseInt(totalResult.rows[0].count);
  return total;
}

module.exports = {
  getAllProductsOfManufacturerWithFilterAndCount,
  getAllManufacturersOfCategory,
  countAllProductsOfManufacturerWithFilters,
};
