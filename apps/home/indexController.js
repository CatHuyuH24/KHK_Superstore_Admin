const indexService = require('./indexService');
const productService = require('../product/productService');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

async function renderHomePage(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    let sort = req.query.sort || 'id';
    let manufacturer = req.query.manufacturer || 'All';
    const search = req.query.search || '';
    const minPrice = req.query.min ? parseInt(req.query.min) : null;
    const maxPrice = req.query.max ? parseInt(req.query.max) : null;

    const selectedmanufacturers =
      manufacturer === 'All' ? [] : manufacturer.split(',');

    const { totalCount, products } =
      await indexService.getAllDiscountedProductsWithFilterAndCount(
        minPrice,
        maxPrice,
        page,
        limit,
        sort,
        manufacturer,
        search
      );

    // get manufacturers of all products
    const allmanufacturers =
      await productService.getAllManufacturersOfCategory();

    const response = {
      title: 'Homepage - Superstore - GA05',
      error: false,
      total: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / limit),
      itemsPerPage: limit,
      products: products,
      manufacturers: allmanufacturers,
      selectedmanufacturers,
    };

    if (req.xhr) {
      return res.json(response);
    }

    return res.render('index', response);
  } catch (error) {
    console.error('Error rendering home page:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

module.exports = {
  renderHomePage,
};
