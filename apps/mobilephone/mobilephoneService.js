const pool = require("../../config/database");

async function getAllMobilephones(sortBy, minPrice, maxPrice, selectedBrands) {
  try {
    // Xây dựng câu truy vấn cơ bản
    let query = "SELECT * FROM mobilephones WHERE 1 = 1";

    // Lọc theo giá nếu có minPrice và maxPrice
    if (minPrice !== null) {
      query += ` AND price >= ${minPrice}`;
    }
    if (maxPrice !== null) {
      query += ` AND price <= ${maxPrice}`;
    }

    // Lọc theo các thương hiệu đã chọn
    if (selectedBrands.length > 0) {
      query += ` AND brand IN (${selectedBrands.map(brand => `'${brand}'`).join(", ")})`;
    }

    // Bổ sung logic sắp xếp dựa trên `sortBy`
    if (sortBy === "price-low-to-high") {
      query += " ORDER BY price ASC";
    } else if (sortBy === "price-high-to-low") {
      query += " ORDER BY price DESC";
    }

    // Thực hiện truy vấn
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching mobilephones:", error.message);
    return [];
  }
}

async function getMobilephoneByID(id) {
  try {
    const result = await pool.query(
      "SELECT * FROM mobilephones WHERE ID = $1",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Error fetching mobilephone by ID", error);
    return [];
  }
}

async function getRelatedMobilephones(currentId, limit = 3) {
  try {
      const query = `
          SELECT * FROM mobilephones 
          WHERE ID != $1 
          ORDER BY RANDOM() 
          LIMIT $2
      `;
      const result = await pool.query(query, [currentId, limit]);
      return result.rows;
  } catch (error) {
      console.error('Error fetching related mobilephones', error);
      return [];
  }
}

module.exports = {
  getAllMobilephones,
  getMobilephoneByID,
  getRelatedMobilephones,
};
