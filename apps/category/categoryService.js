// const pool = require("../../config/database");

// async function getAllProducts(
//   sortBy,
//   minPrice,
//   maxPrice,
//   selectedBrands,
//   search
// ) {
//   try {
//     // Initialize query and queryParams
//     let query = `
//       SELECT id, name, price, imageurl, 'mobilephones' AS category FROM mobilephones WHERE 1 = 1
//       UNION ALL
//       SELECT id, name, price, imageurl, 'computers' AS category FROM computers WHERE 1 = 1
//       UNION ALL
//       SELECT id, name, price, imageurl, 'televisions' AS category FROM televisions WHERE 1 = 1
//     `;
//     let queryParams = [];
//     let filterConditions = [];

//     // Apply search filter
//     if (search) {
//       filterConditions.push("(name ILIKE $1 OR description ILIKE $1)");
//       queryParams.push(`%${search}%`);
//     }

//     // Lọc theo giá nếu có minPrice và maxPrice
//     if (minPrice !== null) {
//       query += ` AND price >= ${minPrice}`;
//     }
//     if (maxPrice !== null) {
//       query += ` AND price <= ${maxPrice}`;
//     }

//     // Lọc theo các thương hiệu đã chọn
//     if (selectedBrands.length > 0) {
//       query += ` AND brand IN (${selectedBrands
//         .map((brand) => `'${brand}'`)
//         .join(", ")})`;
//     }
//     // Combine filter conditions
//     if (filterConditions.length > 0) {
//       query += ` AND ${filterConditions.join(" AND ")}`;
//     }

//     // Apply sorting
//     if (sortBy === "price-low-to-high") {
//       query += " ORDER BY price ASC";
//     } else if (sortBy === "price-high-to-low") {
//       query += " ORDER BY price DESC";
//     }

//     // Execute query
//     const result = await pool.query(query, queryParams);
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching products:", error.message);
//     return [];
//   }
// }

// module.exports = {
//   getAllProducts,
// };
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

module.exports = {
  getAllProducts,
};
