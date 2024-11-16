const televisionService = require("./televisionService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

async function renderTelevisionCategoryPage(req, res) {
  try {
    const sortBy = req.query.sortBy || "";
    const products = await televisionService.getAllTelevisions(sortBy);
    res.render("category", {
      title: "Television Category",
      products: products,
      category: "televisions",
      sortBy,
    });
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
    const queryResult = await televisionService.getTelevisionByID(televisionID);
    res.render("product", { product: queryResult.rows[0] });
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
