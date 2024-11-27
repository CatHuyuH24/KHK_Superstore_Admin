const indexService = require("./indexService");
const productService = require("../product/productService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

async function renderHomePage(req, res) {
	try 
	{
		const page = parseInt(req.query.page)  || 1;
		const limit = parseInt(req.query.limit) || 6;
		let sort = req.query.sort || "id";
		let brand = req.query.brand || "All";
		const search = req.query.search || "";
		const minPrice = req.query.min ? parseInt(req.query.min) : null;
		const maxPrice = req.query.max ? parseInt(req.query.max) : null;

		const selectedBrands = brand === "All" ? [] : brand.split(",");

		const {totalCount, products} = 
			await indexService.getAllDiscountedProductsWithFilterAndCount
			( 	minPrice,
				maxPrice,
				page,
				limit,
				sort,
				brand,
				search);

		// get brands of all products
		const allBrands = await productService.getAllBrandsOfType();

		const response = {
			title: "Homepage - Superstore - GA05",
			error: false,
			total: totalCount,
			page: page + 1,
			totalPages:Math.ceil(totalCount / limit),
			itemsPerPage: limit,
			products: products,
			brands: allBrands,
			selectedBrands
		};

		if (req.xhr) {
			return res.json(response);
		}
		
		return res.render('index', response);
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
