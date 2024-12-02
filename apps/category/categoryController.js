const categoryService = require('./categoryService');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { calculateDiscountedPrice } = require('../Utils/discountedPriceUtils');

async function renderCategoryPage(req, res) {
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

    const { products, total, manufacturers } =
      await categoryService.getAllProductsWithFiltersAndCountAndmanufacturers(
        minPrice,
        maxPrice,
        page,
        limit,
        sort,
        manufacturer,
        search
      );

    products.forEach((product) => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    const response = {
      title: 'Category Page - Superstore - GA05',
      error: false,
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit),
      itemsPerPage: limit,
      products: products,
      manufacturers: manufacturers,
      selectedmanufacturers,
    };

    if (req.xhr) {
      return res.json(response);
    }

    return res.render('category', response);
  } catch (error) {
    console.error('Error rendering category page:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function renderProductPage(req, res) {
  const { category, id } = req.params;

  let product;
  if (category === 'mobilephones') {
    product = await categoryService.getMobilePhoneById(id);
  } else if (category === 'computers') {
    product = await categoryService.getComputerById(id);
  } else if (category === 'televisions') {
    product = await categoryService.getTelevisionById(id);
  } else {
    return res.status(404).send('Category not found');
  }

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.render('product', { title: 'Product Page', product });
}

module.exports = {
  renderCategoryPage,
  renderProductPage,
};
