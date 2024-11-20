const pool = require("../../config/database");
const computerService = require("../computer/computerService");
const mobilephoneService = require("../mobilephone/mobilephoneService");
const televisionService = require("../television/televisionService");

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

module.exports = {
	getAllProductsAsObject,
};
