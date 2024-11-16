const pool = require('../../config/database');

async function getAllComputers (sortBy) {
    try {
        // Xây dựng câu truy vấn cơ bản
        let query = "SELECT * FROM computers";
    
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
    