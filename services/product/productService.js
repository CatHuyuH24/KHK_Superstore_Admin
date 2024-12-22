const pool = require('../../config/database');
const { prepareFilterStatements } = require('../../app/Utils/filterStatementUtils');

/**
 * Get all products of a specific category with filters applied and the total number of products.
 * Each record in the 'products' array contains the following fields:
 * - id
 * - name
 * - manufacturer
 * - price
 * - imageurl
 * - detail
 * - discount
 * - number (number of products in stock)
 * - category_name
 * - distinct_review_count (number of unique users who rated the product)
 * - review_average (average rating of the product)
 * - total_count (total number of products matching the filters)
 *
 * @param {number} minPrice - Minimum price filter.
 * @param {number} maxPrice - Maximum price filter.
 * @param {number} page - Page number for pagination, expected to be greater than 0.
 * @param {number} limit - Number of items per page.
 * @param {string} sort - Sort order (column, direction). e.g. "id,ASC". If not provided, by default is ascending order by id.
 * @param {string} manufacturer - Manufacturer filter. e.g ["Apple", "Samsung",...].
 * @param {string} search - Search keyword.
 * @param {string} products_category - Category of products. e.g. "computers". If not provided, all products will be fetched.
 * @returns {Promise<Object>} An object containing the total count of products and the array of products.
 * @returns {number} return.totalCount - Total number of products matching the filters.
 * @returns {Array} return.products - Array of products.
 * @example
 * const {totalCount, products} = await getAllProductsOfCategoriesWithFilterAndCount(0, 1000, 1, 10, "price,ASC", "Apple", "macbook", "computers");
 */
async function getAllProductsOfCategoriesWithFilterAndCount(
  minPrice,
  maxPrice,
  page,
  limit,
  sort,
  manufacturer,
  search,
  products_category
) {
  try {
    const {
      priceFilter, 
      manufacturerFilter, 
      searchFilter, 
      productsCategoryFilter,
    } = prepareFilterStatements(
      minPrice,
      maxPrice,
      manufacturer,
      search,
      products_category
    );
    let sortFilter = "";
    const [sortColumn, sortDir] = sort.split(",");
    if(sortColumn != null && sortDir != null) {
        sortFilter = `ORDER BY ${sortColumn} ${sortDir}`;
    } else {
        sortFilter = "ORDER BY p.id ASC";
    }

    const result = await pool.query(
      `
            SELECT 
                p.id, 
                p.name, 
                p.image_url, 
                p.number, 
                p.price, 
                p.discount, 
                m.manufacturer_name, 
                c.category_name, 
                COUNT(DISTINCT r.user_id) AS distinct_review_count,
                AVG(r.rating) AS review_average,             
                COUNT(*) OVER() AS total_count
            FROM products p
            JOIN categories c ON p.category_id = c.id
            JOIN manufacturers m ON p.manufacturer_id = m.id
            LEFT JOIN reviews r ON p.id = r.product_id
            WHERE 1=1
            ${productsCategoryFilter}
            ${searchFilter}
            ${manufacturerFilter}
            ${priceFilter}
            GROUP BY 
                p.id, 
                p.name, 
                p.image_url, 
                p.number, 
                p.price, 
                p.discount, 
                m.id, 
                c.id, 
                m.manufacturer_name, 
                c.category_name
            ${sortFilter}
            LIMIT $1 OFFSET $2`,
      [limit, (page - 1) * limit]
    );

    let count = 0;
    if(result.rows.length > 0){
      count = parseInt(result.rows[0].total_count);
    }

    return {
      totalCount: count,
      products: result.rows,
    };
  } catch (error) {
    console.error(
      `Error fetching ${products_category} products from productService:`,
      error.message
    );
    return { totalCount: 0, products: [] };
  }
}

/**
 * Get all manufacturers of a specific product category.
 *
 * @param {string} products_category category of products, e.g. "computers". If not provided, categories of all products will be fetched. e.g. "computers".
 * @returns {Promise<Array>} An array of manufacturers.
 */
async function getAllManufacturersOfCategory(products_category) {
  let productsCategoryFilter = '';
  if (products_category != null)
    productsCategoryFilter = `WHERE category_id = (SELECT id from categories where category_name = '${products_category}')`;

  const manufacturersList = await pool.query(`
        SELECT DISTINCT(m.manufacturer_name) 
        FROM products p
        JOIN manufacturers m ON p.manufacturer_id = m.id
        ${productsCategoryFilter}
        `);

  const manufacturers = manufacturersList.rows.map((row) => row.manufacturer_name);
  return manufacturers;
}

/**
 * Fetches a product by its ID from the database.
 * 
 * @param {number} id - The ID of the product to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the product object if found, or an empty array if not found.
 * @returns {Object} return - The product object.
 * @returns {number} return.id - Product ID.
 * @returns {string} return.name - Product name.
 * @returns {number} return.category_id - Category ID.
 * @returns {number} return.manufacturer_id - Manufacturer ID.
 * @returns {number} return.price - Product price.
 * @returns {string} return.image_url - URL of the product image.
 * @returns {string} return.detail - Product details.
 * @returns {number} return.discount - Discount on the product.
 * @returns {number} return.number - Number of products.
 * @returns {Date} return.last_modified - Last modified timestamp.
 * @returns {number} return.fps_hz - FPS (Hz).
 * @returns {number} return.screen_width_inches - Screen width in inches.
 * @returns {string} return.status - Product status.
 * @returns {number} return.total_purchased - Total number of products purchased.
 * @returns {string} return.manufacturer_name - Manufacturer name.
 * @returns {string} return.category_name - Category name.
 * @throws {Error} - Throws an error if there is an issue with the database query.
 * @example
 * const product = await getProductById(1);
 * console.log(product);
 * // {
 * //   id: 1,
 * //   name: 'Product Name',
 * //   category_id: 2,
 * //   manufacturer_id: 3,
 * //   price: 100,
 * //   image_url: 'http://example.com/image.jpg',
 * //   detail: 'Product details',
 * //   discount: 10,
 * //   number: 50,
 * //   last_modified: '2023-10-01T00:00:00.000Z',
 * //   fps_hz: 60,
 * //   screen_width_inches: 15.6,
 * //   status: 'on stock',
 * //   total_purchased: 200,
 * //   manufacturer_name: 'Manufacturer Name',
 * //   category_name: 'Category Name'
 * // }
 */
async function getProductById(id) {
  try {
    const query = `
    SELECT p.*, m.manufacturer_name, c.category_name, p.status
    FROM products p
    JOIN manufacturers m ON p.manufacturer_id = m.id
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching product by ID', error);
    return [];
  }
}

module.exports = {
    getAllProductsOfCategoriesWithFilterAndCount,
  getAllManufacturersOfCategory,
  getProductById,
};
