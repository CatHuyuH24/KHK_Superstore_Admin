const indexService = require("./indexService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

async function renderHomePage(req, res) {
	try {
		const productsObject =
			await indexService.getAllProductsAsObject();
		res.render("index", { products: productsObject, mobilepath: "mobilephones", computerpath: "computers", televisionpath: "televisions" });
	} catch (error) {
		console.error("Error rendering home page:", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
			getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
		);
	}
}

module.exports = {
	renderHomePage,
};
