
const pool = require("../../config/database");
const {prepareFilterStatements} = require("../Utils/filterStatementUtils");
/**
 * Get all discounted products with filters applied and the total number of products.
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
 * @param {string} sort - Sort order (column, direction). e.g. "id,ASC".
 * @param {string} brand - Brand filter.
 * @param {string} search - Search keyword.
 * @returns {Promise<Object>} - An object containing the total count of discounted products and the list of discounted products.
 * @returns {number} return.totalCount - Total number of discounted products matching the filters.
 * @returns {Array} return.products - List of discounted products.
 * @example
 * const {totalCount, products} = await getAllDiscountedProductsWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Samsung", "samsung galaxy s8");
 */
async function getAllDiscountedProductsWithFilterAndCount(minPrice, maxPrice, page, limit, sort, brand, search) {
    try {
        page = Math.max(1, page);
        const {
            priceFilter, 
            sortDirection, 
            brandFilter, 
            searchFilter, 
            productsTypeFilter
        } = prepareFilterStatements(
            minPrice, maxPrice, sort, 
            brand, search
        );
        
        const result = await pool.query(`
            SELECT p.id, p.name, p.brand, p.price, p.imageurl, p.detail, p.discount, p.numberofpro, t.type_name, count(*) over() as total_count 
            FROM products p 
            JOIN types t ON p.type_id = t.id
            WHERE discount > 0
            ${productsTypeFilter}
            ${searchFilter}
            ${brandFilter}
            ${priceFilter}
            ORDER BY ${sort.split(",")[0]} ${sortDirection}
            LIMIT $1 OFFSET $2`,
            [limit, (page - 1) * limit]
        );
        
        const count = 
            result.rows[0].total_count ? 
            parseInt(result.rows[0].total_count) : 0;
        
        return {
            totalCount: count,
            products: result.rows
        };

    } catch (error) {
        console.error(`Error fetching all discounted products:`, error.message);
        return { totalCount: 0, products: [] };
    }
}

module.exports = {
    getAllDiscountedProductsWithFilterAndCount,
};
