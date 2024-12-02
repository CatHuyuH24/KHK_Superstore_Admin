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
 * @returns {Promise<Object>} - An object containing the total count of discounted products and the list of discounted products.
 * @returns {number} return.totalCount - Total number of discounted products matching the filters.
 * @returns {Array} return.products - Array of discounted products in random order.
 * @example
 * const {totalCount, products} = await getAllDiscountedProductsWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Samsung", "samsung galaxy s8");
 */
<<<<<<< HEAD
async function getAllDiscountedProductsWithFilterAndCount(minPrice, maxPrice, page, limit, sort, brand, search) {
    try {
        page = Math.max(1, page);
        const {
            priceFilter,
            brandFilter, 
            searchFilter,
            sortFilter,
            productsTypeFilter
        } = prepareFilterStatements(
            minPrice, maxPrice, sort, 
            brand, search
        );
        
        const result = await pool.query(`
            SELECT p.id, p.name, p.brand, p.price, p.imageurl, p.detail, p.discount, p.numberofpro, t.category_name, count(*) over() as total_count 
            FROM products p 
            JOIN categories t ON p.type_id = t.id
=======
async function getAllDiscountedProductsWithFilterAndCount(
  minPrice,
  maxPrice,
  page,
  limit,
  sort,
  manufacturer,
  search
) {
  try {
    page = Math.max(1, page);
    const {
      priceFilter, 
      manufacturerFilter, 
      searchFilter, 
      sortFilter, 
      productsCategoryFilter
    } = prepareFilterStatements(minPrice, maxPrice, sort, manufacturer, search);
    
    const result = await pool.query(
      `
            SELECT p.*, c.category_name, m.manufacturer_name, count(*) over() as total_count 
            FROM products p 
            JOIN categories c on p.category_id = c.id
            JOIN manufacturers m ON p.manufacturer_id = m.id
>>>>>>> 618288471fb4135257356048225f83c92779f45d
            WHERE discount > 0
            ${productsCategoryFilter}
            ${searchFilter}
            ${manufacturerFilter}
            ${priceFilter}
            ${sortFilter}
            LIMIT $1 OFFSET $2`,
      [limit, (page - 1) * limit]
    );

    const count = 0;
    if(result.rows.length > 0 && result.rows[0].total_count != null){
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
