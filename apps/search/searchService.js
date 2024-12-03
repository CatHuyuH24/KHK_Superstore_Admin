const pool = require("../../config/database");

async function searchAllProducts(query) {
  try {
    if (!query) {
      console.error("Query is empty or undefined");
      return [];
    }

    const sqlQuery = `
      SELECT p.*, t.category_name
      FROM products p
      JOIN categories t ON p.category_id = t.id
      WHERE p.name ILIKE $1 OR p.detail ILIKE $1
    `;
    const queryParams = [`%${query}%`];
    
    console.log("Executing query with params:", queryParams);
    const result = await pool.query(sqlQuery, queryParams);
    
    console.log("Query result:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error searching products:", error.message);
    return [];
  }
}

module.exports = {
  searchAllProducts,
};