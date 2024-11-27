const pool = require("../../config/database");
const computerService = require("../computer/computerService");
const mobilephoneService = require("../mobilephone/mobilephoneService");
const televisionService = require("../television/televisionService");
const {calculateDiscountedPrice} = require("../Utils/calculateDiscountedPrice");

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
		let computersQueryRows = await computerService.getAllComputers(sortBy, minPrice, maxPrice, selectedBrands, search);

		let mobilephonesQueryRows = await mobilephoneService.getAllMobilephones(sortBy, minPrice, maxPrice, selectedBrands, search);

		let televisionsQueryRows = await televisionService.getAllTelevisions(sortBy, minPrice, maxPrice, selectedBrands, search);

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
