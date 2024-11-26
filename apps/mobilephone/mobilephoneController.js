const mobilephoneService = require("./mobilephoneService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const {calculateDiscountedPrice} = require("../Utils/calculateDiscountedPrice");

async function renderMobilephoneCategoryPage(req, res) {
  try {
    const sortBy = req.query.sortBy || "";
    const search = req.query.search || "";
    const minPrice = req.query.min ? parseInt(req.query.min) : null; // Chuyển min thành số
    const maxPrice = req.query.max ? parseInt(req.query.max) : null;
    const currentCategory = 'category'; // Lấy category từ URL (vd: /mobilephone)
    // Lấy giá trị selectedBrands từ query (có thể là một chuỗi hoặc mảng)
    let selectedBrands = req.query.brands;

    // Kiểm tra và xử lý nếu selectedBrands không phải là mảng
    if (selectedBrands && !Array.isArray(selectedBrands)) {
      selectedBrands = [selectedBrands]; // Nếu là chuỗi, chuyển thành mảng
    } else if (!selectedBrands) {
      selectedBrands = []; // Nếu không có giá trị, khởi tạo mảng rỗng
    }
    let categories;

    categories = [
      { id: "cat-1", name: "Apple", count: 15 },
      { id: "cat-2", name: "Samsung", count: 0 },
      { id: "cat-3", name: "Oppo", count: 0 },
      { id: "cat-4", name: "Xiaomi", count: 0 },
      { id: "cat-5", name: "Vivo", count: 0 },
      { id: "cat-6", name: "Nokia", count: 0 },
    ];

    const products = await mobilephoneService.getAllMobilephones(
      sortBy,
      minPrice,
      maxPrice,
      selectedBrands,
      search,
    );
    products.forEach((product) => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });
    res.render("category", {
      title: "Mobilephone Category - Superstore - GA05",
      products: products, // Use products directly
      category: "mobilephones",
      sortBy,
      search,
      min: minPrice || "",
      max: maxPrice || "",
      categories, // Truyền danh sách categories
      currentCategory,
      selectedBrands, 
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

    const relatedMobilephones = await mobilephoneService.getRelatedMobilephones(mobilephoneID, 5);
    relatedMobilephones.forEach((product) => {
      product.price = calculateDiscountedPrice(product.price, product.discount);
    });

    res.render("product", { product: queryResult.rows[0], relatedProducts: relatedMobilephones, category: "mobilephones", title: queryResult.rows[0].name });
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
