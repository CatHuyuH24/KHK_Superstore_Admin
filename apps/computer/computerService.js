const pool = require('../../config/database');

async function getAllComputers (sortBy, minPrice, maxPrice, selectedBrands, search, limit = 20) {
    try {
        // Xây dựng câu truy vấn cơ bản
        const query = `
        SELECT * 
        FROM products
        WHERE type_id = (SELECT id from types where type_name = 'computers') AND 1 = 1
        `;
    
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
        if ( selectedBrands.length > 0) {
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
        const query = `
        SELECT * 
        FROM products 
        WHERE type_id = (SELECT id from types where type_name = 'computers') AND id = $1
        `;
        const result = await pool.query(query, [id]);
        return result;
    } catch (error) {
        console.error('Error fetching computer by ID', error);
        return [];
    }
}

async function getRelatedComputers(currentId, limit = 3) {
  try {
      const query = `
      SELECT * 
      FROM products 
      WHERE type_id = (SELECT id from types where type_name = 'computers')
      AND id <> $1
      ORDER BY RANDOM() 
      LIMIT $2
      `;
      const result = await pool.query(query, [currentId, limit]);
      return result.rows;
  } catch (error) {
      console.error('Error fetching related computers', error);
      return [];
  }
}

async function getAllDiscountedComputers (sortBy, minPrice, maxPrice, selectedBrands, search, limit = 20) {
  try {
      const query = `
      SELECT *
      FROM products
      WHERE type_id = (SELECT id from types where type_name = 'computers')
      AND discount > 0 AND 1 = 1
      `;
      let queryParams = [];
  
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
      if ( selectedBrands.length > 0) {
        query += ` AND brand IN (${selectedBrands.map(brand => `'${brand}'`).join(", ")})`;
      }
  
      // Bổ sung logic sắp xếp dựa trên `sortBy`
      if (sortBy === "price-low-to-high") {
        query += " ORDER BY price ASC";
      } else if (sortBy === "price-high-to-low") {
        query += " ORDER BY price DESC";
      }

      query += ` LIMIT ${limit}`;
  
      // Thực hiện truy vấn
      const result = await pool.query(query, queryParams);
      return result.rows;
  } catch (error) {
      console.error('Error fetching all discounted computers', error);
      return [];
  }
}

async function getAllBrands() {
  const query =`
  SELECT DISTINCT brand
  FROM products
  WHERE type_id = (SELECT id from types where type_name = 'computers')
  `;
  const result = await pool.query(query);
  return result.rows;
}

module.exports = {
    getAllComputers,
    getComputerByID,
    getRelatedComputers,
    getAllDiscountedComputers,
};
    