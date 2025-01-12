const pool = require('../../config/database');
const { prepareFilterStatements } = require('../Utils/filterStatementUtils');
/**
 * Get all discounted products with filters applied and the total number of products.
 * Each record in the result set contains the following fields:
 * - id
 * - name
 * - manufacturer
 * - price
 * - imageurl
 * - detail
 * - discount
 * - numberofpro (number of products)
 * - category_name (category of product)
 * - total_count (total number of products matching the filters)
 *
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {number} page - Page number for pagination, expected to be greater than 0.
 * @param {number} limit - Number of items per page.
 * @param {string} sort - Sort order (column, direction). e.g. "id,ASC". If not provided, by default is random order.
 * @param {string} manufacturer - manufacturer filter.
 * @param {string} search - Search keyword.
 * @param {string} startDate - start date
 * @param {string} endDate - end date
 * @param {number} fps - frame fresh rate
 * @returns {Promise<Object>} - An object containing the total count of discounted products and the list of discounted products.
 * @returns {number} return.totalCount - Total number of discounted products matching the filters.
 * @returns {Array} return.products - Array of discounted products in random order.
 * @example
 * const {totalCount, products} = await getAllDiscountedProductsWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Samsung", "samsung galaxy s8");
 */
async function getAllDiscountedProductsWithFilterAndCount(
  minPrice,
  maxPrice,
  page,
  limit,
  sort,
  manufacturer,
  search,
  startDate,
  endDate,
  fps
) {
  try {
    page = Math.max(1, page);
    const {
      priceFilter, 
      manufacturerFilter, 
      searchFilter, 
      sortFilter, 
      productsCategoryFilter,
      dateFilter, 
      fpsFilter,
    } = prepareFilterStatements(minPrice, maxPrice, sort, manufacturer, search, null, startDate, endDate, fps);
    
    const result = await pool.query(
      `
            SELECT p.*, c.category_name, m.manufacturer_name, count(*) over() as total_count 
            FROM products p 
            JOIN categories c on p.category_id = c.id
            JOIN manufacturers m ON p.manufacturer_id = m.id
            WHERE discount > 0 
              ${productsCategoryFilter}
              ${searchFilter}
              ${priceFilter}
              ${dateFilter}
              ${fpsFilter}
              ${sortFilter}
              ${manufacturerFilter}
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
    console.error(`Error fetching all discounted products:`, error.message);
    return { totalCount: 0, products: [] };
  }
}

module.exports = {
  getAllDiscountedProductsWithFilterAndCount,
};
