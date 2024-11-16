const pool = require("../../config/database");

async function searchAllProducts(search) {
  try {
    let query = `
      SELECT 'mobilephones' AS category, id, name, description, price, imageurl FROM mobilephones WHERE name ILIKE $1 OR description ILIKE $1
      UNION
      SELECT 'computers' AS category, id, name, description, price, imageurl FROM computers WHERE name ILIKE $1 OR description ILIKE $1
      UNION
      SELECT 'televisions' AS category, id, name, description, price, imageurl FROM televisions WHERE name ILIKE $1 OR description ILIKE $1
    `;
    const queryParams = [`%${search}%`];

    const result = await pool.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error("Error searching products:", error.message);
    return [];
  }
}

module.exports = {
  searchAllProducts,
};
