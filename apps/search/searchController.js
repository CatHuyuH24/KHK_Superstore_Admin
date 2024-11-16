const searchService = require("./searchService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

async function handleAjaxSearch(req, res) {
  try {
    const search = req.query.search || "";
    const products = await searchService.searchAllProducts(search);
    res.json({ products });
  } catch (error) {
    console.error("Error handling AJAX search:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
}

module.exports = {
  handleAjaxSearch,
};
