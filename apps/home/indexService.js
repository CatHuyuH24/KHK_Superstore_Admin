const pool = require("../../config/database");
const {calculateDiscountedPrice} = require("../Utils/discountedPriceUtils.js");

/**
 * 
 * @param {*} sortBy 
 * @param {*} minPrice 
 * @param {*} maxPrice 
 * @param {*} selectedBrands 
 * @param {*} search 
 * @returns an object containing all products categorized by type (access by key: computers, mobilephones, televisions)
 * 
 * @example
 * const products = await getAllProductsAsObject(sortBy, minPrice, maxPrice, selectedBrands, search);
 * console.log(products.computers);// print out the array of 'computer' objects
 */
async function getAllProductsAsObject(sortBy, minPrice, maxPrice, selectedBrands, search) {
	try {
		// const products = await 
		// return products;
		console.log("getAllProducts in indexService.js");
		
	} catch (err) {
		console.error("Error fetching products:", err);
		throw err;
	}
}

async function getAllDiscountedProductsAsObject(minPrice,
	maxPrice,
	page,
	limit,
	sort,
	brand,
	search) {
	try {
		let computersQueryRows = await computerService.getAllDiscountedComputers(sortBy, minPrice, maxPrice, selectedBrands, search);
		computersQueryRows.forEach((product) => {
			product.price = calculateDiscountedPrice(product.price, product.discount);
		});

		let mobilephonesQueryRows = await mobilephoneService.getAllDiscountedMobilephones(sortBy, minPrice, maxPrice, selectedBrands, search);
		mobilephonesQueryRows.forEach((product) => {
			product.price = calculateDiscountedPrice(product.price, product.discount);
		});

		let televisionsQueryRows = await televisionService.getAllDiscountedTelevisions(sortBy, minPrice, maxPrice, selectedBrands, search);
		televisionsQueryRows.forEach((product) => {
			product.price = calculateDiscountedPrice(product.price, product.discount);
		});

		let products = {
			computers: computersQueryRows,
			mobilephones: mobilephonesQueryRows,
			televisions: televisionsQueryRows,
		};
		return products;
	} catch (err) {
		console.error("Error fetching products:", err);
		throw err;
	}
}

module.exports = {
	getAllProductsAsObject,
	getAllDiscountedProductsAsObject,
};
