const computerService = require("./computerService");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

async function renderCompterCategoryPage(req, res) {
  try {
    const sortBy = req.query.sortBy || "";
    const search = req.query.search || "";
    const minPrice = req.query.min ? parseInt(req.query.min) : null; // Chuyển min thành số
    const maxPrice = req.query.max ? parseInt(req.query.max) : null;
    const currentCategory = req.params.category; // Lấy category từ URL (vd: /mobilephone)
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
      { id: "cat-2", name: "Dell", count: 0 },
      { id: "cat-3", name: "Asus", count: 0 },
      { id: "cat-4", name: "Acer", count: 0 },
    ];

    const products = await computerService.getAllComputers(
      sortBy,
      minPrice,
      maxPrice,
      selectedBrands,
      search
    );
    res.render("category", {
      title: "Computer Category",
      products: products, // Use products directly
      category: "computers",
      sortBy,
      search,
      min: minPrice || "",
      max: maxPrice || "",
      categories, // Truyền danh sách categories
      currentCategory,
      selectedBrands,
    });
  } catch (error) {
    console.error("Error rendering computer category page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

async function renderComputerDetailPage(req, res) {
  try {
    const computerID = req.params.id;
    const queryResult = await computerService.getComputerByID(computerID);

    const relatedComputers = await computerService.getRelatedComputers(
      computerID,
      5
    );
    res.render("product", {
      product: queryResult.rows[0],
      relatedProducts: relatedComputers,
    });
  } catch (error) {
    console.error("Error rendering computer detail page:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

module.exports = {
  renderCompterCategoryPage,
  renderComputerDetailPage,
};
