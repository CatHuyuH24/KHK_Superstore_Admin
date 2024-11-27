const indexService = require("./indexService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

async function renderHomePage(req, res) {
	try 
	{
		const page = parseInt(req.query.page)  || 0;
		const limit = parseInt(req.query.limit) || 6;
		let sort = req.query.sort || "id";
		let brand = req.query.brand || "All";
		const search = req.query.search || "";
		const minPrice = req.query.min ? parseInt(req.query.min) : null;
		const maxPrice = req.query.max ? parseInt(req.query.max) : null;

		const selectedBrands = brand === "All" ? [] : brand.split(",");
	

    	let categories;
		
		// //hard-coded for the time being, concatenating from all the categories
		// categories = [

		// //computers
		// { id: "cat-1", name: "Apple", count: 15 },
		// { id: "cat-2", name: "Dell", count: 0 },
		// { id: "cat-3", name: "Asus", count: 0 },
		// { id: "cat-4", name: "Acer", count: 0 },

		// //mobilephones
		// { id: "cat-11", name: "Apple", count: 15 },
		// { id: "cat-12", name: "Samsung", count: 0 },
		// { id: "cat-13", name: "Oppo", count: 0 },
		// { id: "cat-14", name: "Xiaomi", count: 0 },
		// { id: "cat-15", name: "Vivo", count: 0 },
		// { id: "cat-16", name: "Nokia", count: 0 },

		// //televisions
		// { id: "cat-21", name: "Darling", count: 15 },
		// { id: "cat-22", name: "LG", count: 0 },
		// { id: "cat-23", name: "Samsung", count: 0 },
		// ];

	const products = await indexService.get(
		minPrice,
		maxPrice,
		page,
		limit,
		sort,
		brand,
		search,
	);
	
	const productsObject =
		await indexService.getAllDiscountedProductsAsObject
		(sort, minPrice, maxPrice, selectedBrands, search);

	res.render("index", 
		{ 
			products: productsObject, 
			mobilepath: "mobilephones", 
			computerpath: "computers", 
			televisionpath: "televisions",
			sortBy,
			search,
			min: minPrice || "",
			max: maxPrice || "",
			categories,
			currentCategory,
			selectedBrands,
			title: "Homepage - Supershop - GA05"
		});
	
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
