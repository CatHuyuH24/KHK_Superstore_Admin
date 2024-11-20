const pool = require("../../config/database");

async function getAllProducts(
  sortBy,
  minPrice,
  maxPrice,
  selectedBrands,
  search
) {
  try {
    let queryParams = [];
    let priceFilter = "";
    let brandFilter = "";

    // Build price filter
    if (minPrice !== null) {
      priceFilter += ` AND price >= $${queryParams.length + 1}`;
      queryParams.push(minPrice);
    }
    if (maxPrice !== null) {
      priceFilter += ` AND price <= $${queryParams.length + 1}`;
      queryParams.push(maxPrice);
    }

    // Build brand filter
    if (selectedBrands.length > 0) {
      const brandPlaceholders = selectedBrands
        .map((_, index) => `$${queryParams.length + index + 1}`)
        .join(", ");
      brandFilter += ` AND brand IN (${brandPlaceholders})`;
      queryParams.push(...selectedBrands);
    }

    // Build query with filters for each subquery
    let query = `
      SELECT id, name, price, imageurl, 'mobilephones' AS category 
      FROM mobilephones 
      WHERE 1 = 1 ${priceFilter} ${brandFilter}
      
      UNION ALL
      
      SELECT id, name, price, imageurl, 'computers' AS category 
      FROM computers 
      WHERE 1 = 1 ${priceFilter} ${brandFilter}
      
      UNION ALL
      
      SELECT id, name, price, imageurl, 'televisions' AS category 
      FROM televisions 
      WHERE 1 = 1 ${priceFilter} ${brandFilter}
    `;

    // Apply sorting
    if (sortBy === "price-low-to-high") {
      query += " ORDER BY price ASC";
    } else if (sortBy === "price-high-to-low") {
      query += " ORDER BY price DESC";
    }

    console.log("Final query:", query);
    console.log("Query parameters:", queryParams);

    // Execute query
    const result = await pool.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
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
  getAllProducts,
  getMobilePhoneById,
  getComputerById,
  getTelevisionById,
};
