/**
 * Prepare SQL filter statements based on provided inputs.
 * 
 * @note This function does not handle sortFilter. Sorting should be handled separately.
 * 
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {string} manufacturer - Manufacturer filter.
 * @param {string} search - Search keyword.
 * @param {string} products_category - Category of products, e.g. "mobilephones". If not provided, all products are considered.
 * @returns {Object} Object containing SQL filter statements.
 * @returns {string} priceFilter - SQL statement for price filter. Blank if no price filter is applied.
 * @returns {string} manufacturerFilter - SQL statement for manufacturer filter. Blank if no manufacturer filter is applied.
 * @returns {string} searchFilter - SQL statement for search filter. Blank if no search filter is applied.
 * @returns {string} productsCategoryFilter - SQL statement for product category filter. Blank if no product category filter is applied.
 * @example
 * const {priceFilter, manufacturerFilter, searchFilter, productsCategoryFilter} = prepareFilterStatements(100, 500, "Samsung", "Galaxy", "mobilephones");
 */
function prepareFilterStatements(minPrice, maxPrice, manufacturer, search, products_category) {
    let productsCategoryFilter = "";
    if(products_category != null)
        productsCategoryFilter = `AND category_id = (SELECT id from categories where category_name = '${products_category}')`;

    // initialize filters
    let manufacturerFilter = manufacturer === "All" ? "" : `AND manufacturer_name IN (${manufacturer.split(",").map(g => `'${g}'`).join(", ")})`;
    let searchFilter = search ? `AND name ILIKE '%${search}%'` : "";
    let priceFilter = ""; 

    if (minPrice !== null && maxPrice !== null) {
        priceFilter = `AND price BETWEEN ${minPrice} AND ${maxPrice}`;
    } else if (minPrice !== null) {
        priceFilter = `AND price >= ${minPrice}`;
    } else if (maxPrice !== null) {
        priceFilter = `AND price <= ${maxPrice}`;
    }

    return {priceFilter, manufacturerFilter, searchFilter, productsCategoryFilter};
}

module.exports = {
    prepareFilterStatements,
};