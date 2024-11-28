const mobilephoneService = require("./mobilephoneService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const {calculateDiscountedPrice} = require("../Utils/discountedPriceUtils");

async function renderMobilephoneCategoryPage(req, res) {
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
    await mobilephoneService.getAllMobilephonesWithFilterAndCount
    (minPrice, maxPrice, page, 
      limit, sort, brand, search);

    products.forEach(product => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    const brandsList = await mobilephoneService.getAllMobilephoneBrands();

    const response = {
      title: "Mobilephones - Superstore - GA05",
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
    console.error("Error rendering mobilephone category page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function renderMobilephoneDetailPage(req, res) {
  try {
    const mobilephoneID = req.params.id;
    const mobilephone = await mobilephoneService.getMobilephoneByID(mobilephoneID);
    mobilephone.price = calculateDiscountedPrice(mobilephone.price, mobilephone.discount);

    const relatedComputers = await mobilephoneService.getRelatedMobilephones(mobilephoneID, 5);
    relatedComputers.forEach((product) => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    const TITLE = mobilephone.name + " - Superstore - GA05";

    res.render("product", { product: mobilephone, relatedProducts: relatedComputers, title: TITLE });
  } catch (error) {
    console.error("Error rendering mobilephone detail page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

module.exports = {
  renderMobilephoneCategoryPage,
  renderMobilephoneDetailPage,
};
