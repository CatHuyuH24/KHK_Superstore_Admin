const pool = require("../../config/database");
const productsService = require("../product/productService");
async function getAllProducts(minPrice, maxPrice, page, limit, sort, brand, search) {
  try {
    // Đảm bảo page không nhỏ hơn 1
    page = Math.max(1, page);

    //product_type is not provided, which means we want to get all products
    const products = 
      await productsService.getAllProductsOfTypeWithFilter
      (minPrice, maxPrice, page, limit, sort, brand, search);

    //get the total number of products (product_type is not provided)
    const total = 
      await productsService.countAllProductsOfTypeWithFilters
      (minPrice, maxPrice, brand, search);

    //get all brands of products (product_type is not provided)
    const brands = await productsService.getAllBrandsOfType();

    return { result: products, total, brands };

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


