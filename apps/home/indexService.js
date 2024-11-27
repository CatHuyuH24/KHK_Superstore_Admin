
const pool = require("../../config/database");
const productService = require("../product/productService");
const {prepareFilterStatements} = require("../Utils/filterStatementUtils");

async function getAllDiscountedProductsWithFilterAndCount(minPrice, maxPrice, page, limit, sort, brand, search) {
	try {
        const {
            priceFilter, 
            sortDirection, 
            brandFilter, 
            searchFilter, 
            productsTypeFilter
        } = prepareFilterStatements(
            minPrice, maxPrice, sort, 
            brand, search, products_type
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
        
        const totalCount = result.rows.length > 0 ? result.rows[0].total_count : 0;
        
        return {
            totalCount,
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
