const categoryService = require("./categoryService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

async function renderCategoryPage(req, res) {
  try {
    const sortBy = req.query.sortBy || "";
    const search = req.query.search || "";
    const minPrice = req.query.min ? parseInt(req.query.min) : null;
    const maxPrice = req.query.max ? parseInt(req.query.max) : null;
    const currentCategory = req.params.category; // Lấy category từ URL (vd: /mobilephone)
    let selectedBrands = req.query.brands;

    // Handle selectedBrands if it's not an array
    if (selectedBrands && !Array.isArray(selectedBrands)) {
      selectedBrands = [selectedBrands];
    } else if (!selectedBrands) {
      selectedBrands = [];
    }
    let categories;

    // Example categories (you can fetch these from the database if needed)
    categories = [
      { id: "cat-1", name: "Apple", count: 15 },
      { id: "cat-2", name: "Dell", count: 0 },
      { id: "cat-3", name: "Asus", count: 0 },
      { id: "cat-4", name: "Acer", count: 0 },
      { id: "cat-2", name: "Samsung", count: 0 },
      { id: "cat-3", name: "Oppo", count: 0 },
      { id: "cat-4", name: "Xiaomi", count: 0 },
      { id: "cat-5", name: "Vivo", count: 0 },
      { id: "cat-6", name: "Nokia", count: 0 },
      { id: "cat-1", name: "Darling", count: 15 },
      { id: "cat-2", name: "LG", count: 0 },
    ];

    const products = await categoryService.getAllProducts(
      sortBy,
      minPrice,
      maxPrice,
      selectedBrands,
      search
    );

    res.render("category", {
      title: "Category Page",
      products: products,
      category: "categories",
      currentCategory,
      categories,
      selectedBrands,
      sortBy,
      min: minPrice || "",
      max: maxPrice || "",
      search,
    });
  } catch (error) {
    console.error("Error rendering category page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

module.exports = {
  renderCategoryPage,
};
