const pool = require('../../config/database');

async function getAllComputers (sortBy, minPrice, maxPrice, selectedBrands, search) {
    try {
        // Xây dựng câu truy vấn cơ bản
        let query = "SELECT * FROM computers WHERE 1 = 1";
    
        if (search) {
            query += " AND (name ILIKE $1 OR description ILIKE $1)";
            queryParams.push(`%${search}%`);
          }
          
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
        console.error('Error fetching all computers', error);
        return [];
    }
}

async function getComputerByID(id) {
    try {
        const result = await pool.query('SELECT * FROM computers WHERE ID = $1', [id]);
        return result;
    } catch (error) {
        console.error('Error fetching computer by ID', error);
        return [];
    }
}

module.exports = {
    getAllComputers,
    getComputerByID,
};
    