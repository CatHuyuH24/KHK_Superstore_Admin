const pool = require("../../config/database");

async function searchAllProducts(query) {
  try {
    if (!query) {
      console.error("Query is empty or undefined");
      return [];
    }

    const sqlQuery = `
      SELECT id, name, price, imageurl, 'mobilephones' AS category 
      FROM mobilephones 
      WHERE name ILIKE $1
      UNION ALL
      SELECT id, name, price, imageurl, 'computers' AS category 
      FROM computers 
      WHERE name ILIKE $1
      UNION ALL
      SELECT id, name, price, imageurl, 'televisions' AS category 
      FROM televisions 
      WHERE name ILIKE $1
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
