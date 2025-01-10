const mobilephoneService = require("./mobilephoneService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const {calculateDiscountedPrice} = require("../Utils/discountedPriceUtils");
const { use } = require("passport");

async function renderMobilephoneCategoryPage(req, res) {
  try {
    const page = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 6;
    let sort = req.query.sort || "id";
    let manufacturer = req.query.manufacturer || "All";
    const search = req.query.search || "";
    const minPrice = req.query.min ? parseInt(req.query.min) : null;
    const maxPrice = req.query.max ? parseInt(req.query.max) : null;
    const selectedManufacturers = manufacturer === "All" ? [] : manufacturer.split(",");
    const userID = res.locals.user ? res.locals.user.id : null;

    const {totalCount, products} = 
    await mobilephoneService.getAllMobilephonesWithFilterAndCount
    (minPrice, maxPrice, page, 
      limit, sort, manufacturer, search);

    products.forEach(product => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    const manufacturersList = await mobilephoneService.getAllMobilephoneManufacturers();

    const response = {
      title: "Mobilephones - Superstore",
      error: false,
      total: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / limit),
      itemsPerPage: limit,
      products: products,
      manufacturers: manufacturersList,
      selectedManufacturers,
      user_id: userID,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const mobilephoneID = req.params.id;
    const mobilephone = await mobilephoneService.getMobilephoneByID(mobilephoneID);
    const userID = res.locals.user ? res.locals.user.id : null;
    mobilephone.price = calculateDiscountedPrice(mobilephone.price, mobilephone.discount);

    const relatedMobilephones = await mobilephoneService.getRelatedMobilephones(mobilephoneID, 5);
    relatedMobilephones.forEach((product) => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    let {reviews, reviewAverage, reviewerCount, totalCount} = await mobilephoneService.getReviewsInfoOfMobilephoneById(mobilephoneID, page, limit);
    const TITLE = mobilephone.name + " - Superstore";
    const response = {
      product: mobilephone, 
      related_products: relatedMobilephones, 
      title: TITLE, 
      user_id: userID, 
      reviews: reviews,
      review_average: reviewAverage,
      reviewer_count: reviewerCount,
      total_reviews_count: totalCount,
      total_pages: Math.ceil(totalCount / limit),
      page: page,
      reviews_per_page: limit,
      error: false,
    }

    if(req.xhr) {
      return res.json(response);
    }

    res.render("product", response);
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
