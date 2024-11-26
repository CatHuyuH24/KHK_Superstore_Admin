const pool = require("../../config/database");

async function getAllProducts(minPrice, maxPrice, page, limit, sort, brand, search) {
  try {
    // Đảm bảo page không nhỏ hơn 1
    page = Math.max(1, page);

    let brandFilter = brand === "All" ? "" : `AND brand IN (${brand.split(",").map(g => `'${g}'`).join(", ")})`;
    let searchFilter = search ? `AND name ILIKE '%${search}%'` : "";
    let priceFilter = ""; // Khởi tạo chuỗi lọc giá

    if (minPrice !== null && maxPrice !== null) {
      priceFilter = `AND price BETWEEN ${minPrice} AND ${maxPrice}`;
    } else if (minPrice !== null) {
      priceFilter = `AND price >= ${minPrice}`;
    } else if (maxPrice !== null) {
      priceFilter = `AND price <= ${maxPrice}`;
    }

    let sortDirection = sort.split(",")[1] || "ASC";

    const result = await pool.query(
      `SELECT * FROM products
       WHERE 1=1
       ${searchFilter}
       ${brandFilter}
       ${priceFilter} -- Thêm bộ lọc giá
       ORDER BY ${sort.split(",")[0]} ${sortDirection}
       LIMIT $1 OFFSET $2`,
      [limit, (page - 1) * limit]
    );

    const totalResult = await pool.query(
      `SELECT COUNT(*) FROM products
       WHERE 1=1
       ${searchFilter}
       ${brandFilter}
       ${priceFilter}` // Thêm bộ lọc giá
    );
    const total = parseInt(totalResult.rows[0].count);

    const listBrands = await pool.query(
      `SELECT DISTINCT(brand) FROM products`
    );

    const brands = listBrands.rows.map(row => row.brand);

    return { result: result.rows, total, brands };

  } catch (error) {
    console.error("Error fetching products:", error.message);
    return { result: [], total: 0, brands: [] };
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


