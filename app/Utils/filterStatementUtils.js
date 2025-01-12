/**
 * Prepare SQL filter statements based on provided inputs.
 * 
 * @note This function does not handle sortFilter. Sorting should be handled separately.
 * 
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {string} startDate - Start date filter.
 * @param {string} endDate - End date filter
 * @param {string} sort - Sort order (column, direction), e.g. "id,ASC". If not provided will be RANDOM() by default.
 * @param {string} manufacturer - Manufacturer filter.
 * @param {string} search - Search keyword.
 * @param {string} products_category - Category of products, e.g. "mobilephones". If not provided, all products are considered.
 * @param {number} fps
 * @returns {Object} Object containing SQL filter statements.
 * @returns {string} priceFilter - SQL statement for price filter. Blank if no price filter is applied.
 * @returns {string} manufacturerFilter - SQL statement for manufacturer filter. Blank if no manufacturer filter is applied.
 * @returns {string} searchFilter - SQL statement for search filter. Blank if no search filter is applied.
 * @returns {string} productsCategoryFilter - SQL statement for product category filter. Blank if no product category filter is applied.
 * @returns {string} dateFilter - SQL statement for date filter. Blank if no date filter is applied.
 * @example
 * const {priceFilter, manufacturerFilter, searchFilter, productsCategoryFilter} = prepareFilterStatements(100, 500, "Samsung", "Galaxy", "mobilephones");
 */
function prepareFilterStatements(minPrice, maxPrice, sort, manufacturer, search, products_category, startDate, endDate, fps) {
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

    let dateFilter = "";
    if (startDate != null && endDate != null && startDate != "" && endDate != "") {
        dateFilter = `AND p.created_at BETWEEN '${startDate}' AND '${endDate}'`;
    } else if (startDate != null && startDate != "") {
        dateFilter = `AND p.created_at >= '${startDate}'`;
    } else if (endDate != null && endDate != "") {
        dateFilter = `AND p.created_at <= '${endDate}'`;
    }
    
    let sortFilter = "";
    const [sortColumn, sortDir] = sort.split(",");
    if(sortColumn != null && sortDir != null) {
        sortFilter = `ORDER BY ${sortColumn} ${sortDir}`;
    } else {
        sortFilter = "ORDER BY RANDOM()";
    }

    let fpsFilter = "";
    if (fps != null && fps.length > 0) {
        const fpsValues = fps.split(",").map(f => `'${f}'`).join(", ");
        fpsFilter = `AND fps_hz IN (${fpsValues})`;
    }
    
    return {priceFilter, manufacturerFilter, dateFilter, searchFilter, sortFilter, productsCategoryFilter, fpsFilter};
}

function prepareFilterStatementsForOrder(status, search) {
    let orderFilter;
    if (status === 'Paid' || status === 'Unpaid') {
        orderFilter = `AND status_payment IN ('${status}')`;
    } else if (status === 'All') {
        orderFilter = "";
    } else {
        orderFilter = `AND status IN ('${status}')`;
    }
    
    let searchFilter = search ? `AND order_code LIKE '%${search}%'` : "";

  
    return { orderFilter, searchFilter };
}

module.exports = {
    prepareFilterStatements,
  prepareFilterStatementsForOrder,
};