// models/productModel.js
const pool = require("../db");

const getAll = async () => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
};

module.exports = {
  getAll,
};
