const categoryService = require('./categoryService');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { calculateDiscountedPrice } = require('../Utils/discountedPriceUtils');
async function renderCategoryPage(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    let sort = req.query.sort || 'id,desc';
    let manufacturer = req.query.manufacturer || 'All';
    const search = req.query.search || '';
    const minPrice = req.query.min ? parseInt(req.query.min) : null;
    const maxPrice = req.query.max ? parseInt(req.query.max) : null;
    const userID = res.locals.user ? res.locals.user.id : null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const fps =req.query.fps || ''

    const selectedFPS = fps === 'All' ? [] : fps.split(',').map(fpsValue => parseInt(fpsValue, 10));
    const selectedManufacturers =
      manufacturer === 'All' ? [] : manufacturer.split(',');

    const { products, total, manufacturers } =
      await categoryService.getAllProductsWithFiltersAndCountAndmanufacturers(
        minPrice,
        maxPrice,
        page,
        limit,
        sort,
        manufacturer,
        search,
        startDate,
        endDate,
        fps,
        null,
      );

    products.forEach((product) => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });
 

    const response = {
      title: 'Category Page - Superstore',
      error: false,
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit),
      itemsPerPage: limit,
      products: products,
      manufacturers: manufacturers,
      selectedManufacturers,
      selectedFPS,
      user_id: userID,
    };

    if (req.xhr) {
      return res.json(response);
    }
    return res.render('products', response);
  } catch (error) {
    console.error('Error rendering all products page:', error);
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
    return res.status(StatusCodes.NOT_FOUND).send('Category not found');
  }

  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).send('Product not found');
  }

  res.render('product', { title: 'Product Page', product });
}

module.exports = {
  renderCategoryPage,
  renderProductPage,
};