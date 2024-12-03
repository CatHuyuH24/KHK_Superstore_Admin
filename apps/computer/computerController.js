const computerService = require("./computerService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const {calculateDiscountedPrice} = require("../Utils/discountedPriceUtils");

async function renderComputerCategoryPage(req, res) {
  try {
    const page = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 6;
    let sort = req.query.sort || "id";
    let manufacturer = req.query.manufacturer || "All";
    const search = req.query.search || "";
    const minPrice = req.query.min ? parseInt(req.query.min) : null;
    const maxPrice = req.query.max ? parseInt(req.query.max) : null;
    const selectedManufacturers = manufacturer === "All" ? [] : manufacturer.split(",");

    const {totalCount, products} = 
    await computerService.getAllComputersWithFilterAndCount
    (minPrice, maxPrice, page, 
      limit, sort, manufacturer, search);

    products.forEach(product => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    const manufacturersList = await computerService.getAllComputerManufacturers();

    const response = {
      title: "Computers - Superstore - GA05",
      error: false,
      total: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / limit),
      itemsPerPage: limit,
      products: products,
      manufacturers: manufacturersList,
      selectedManufacturers,
    };

    if (req.xhr) {
      return res.json(response);
    }

    return res.render("category", response);
  } catch (error) {
    console.error("Error rendering computer category page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function renderComputerDetailPage(req, res) {
  try {
    const computerID = req.params.id;
    const computer = await computerService.getComputerByID(computerID);
    computer.price = calculateDiscountedPrice(computer.price, computer.discount);

    const relatedComputers = await computerService.getRelatedComputers(computerID, 5);
    relatedComputers.forEach((product) => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    const TITLE = computer.name + " - Superstore - GA05";

    res.render("product", { product: computer, relatedProducts: relatedComputers, title: TITLE });
  } catch (error) {
    console.error("Error rendering computer detail page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

module.exports = {
  renderComputerCategoryPage,
  renderComputerDetailPage,
};
