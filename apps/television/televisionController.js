const televisionService = require("./televisionService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const {calculateDiscountedPrice} = require("../Utils/discountedPriceUtils");

async function renderTelevisionCategoryPage(req, res) {
  try {
    const page = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 6;
    let sort = req.query.sort || "id";
    let brand = req.query.brand || "All";
    const search = req.query.search || "";
    const minPrice = req.query.min ? parseInt(req.query.min) : null;
    const maxPrice = req.query.max ? parseInt(req.query.max) : null;
    const selectedBrands = brand === "All" ? [] : brand.split(",");

    const {totalCount, products} = 
    await televisionService.getAllTelevisionsWithFilterAndCount
    (minPrice, maxPrice, page, 
      limit, sort, brand, search);

    products.forEach(product => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    const brandsList = await televisionService.getAllTelevisionBrands();

    const response = {
      title: "Televisions - Superstore - GA05",
      error: false,
      total: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / limit),
      itemsPerPage: limit,
      products: products,
      brands: brandsList,
      selectedBrands,
    };

    if (req.xhr) {
      return res.json(response);
    }

    return res.render("category", response);
  } catch (error) {
    console.error("Error rendering television category page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function renderTelevisionDetailPage(req, res) {
  try {
    const televisionID = req.params.id;
    const television = await televisionService.getTelevisionByID(televisionID);
    television.price = calculateDiscountedPrice(television.price, television.discount);

    const relatedComputers = await televisionService.getRelatedTelevisions(televisionID, 5);
    relatedComputers.forEach((product) => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    const TITLE = television.name + " - Superstore - GA05";

    res.render("product", { product: television, relatedProducts: relatedComputers, title: TITLE });
  } catch (error) {
    console.error("Error rendering television detail page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

module.exports = {
  renderTelevisionCategoryPage,
  renderTelevisionDetailPage,
};
