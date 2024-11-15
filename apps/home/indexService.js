const pool = require("../../config/database");
const computerService = require("../computer/computerService");
const mobilephoneService = require("../mobilephone/mobilephoneService");
const televisionService = require("../television/televisionService");

async function getAllProductsAsObject() {
	try {
		let computersQueryResult = await computerService.getAllComputers();

		let mobilephonesQueryResult = await mobilephoneService.getAllMobilephones();

		let televisionsQueryResult = await televisionService.getAllTelevisions();

		let products = {
			computers: computersQueryResult.rows,
			mobilephones: mobilephonesQueryResult.rows,
			televisions: televisionsQueryResult.rows,
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
