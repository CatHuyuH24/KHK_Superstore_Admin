const mobilephoneService = require("./mobilephoneService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

async function renderMobilephoneCategoryPage(req, res) {
  try {
    const sortBy = req.query.sortBy || "";
    const products = await mobilephoneService.getAllMobilephones(sortBy);
    res.render("category", {
      title: "Mobilephone Category",
      products: products, // Use products directly
      category: "mobilephones",
      sortBy,
    });
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
    const queryResult = await mobilephoneService.getMobilephoneByID(
      mobilephoneID
    );
    res.render("product", { product: queryResult.rows[0] });
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
