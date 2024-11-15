const renderHomePage = async (req, res) => {
  try {
    // Giả sử bạn lấy products từ một API hoặc cơ sở dữ liệu
    const products = await fetchProducts(); // Hàm giả định fetch sản phẩm

    // Kiểm tra nếu products là mảng hợp lệ
    console.log("Products:", products); // Log ra giá trị để kiểm tra
    if (!Array.isArray(products)) {
      console.error("Products is not an array");
      return res.render("index", { products: [] }); // Trả về mảng rỗng nếu không phải mảng
    }

    // Render trang với dữ liệu products
    res.render("index", { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.render("index", { products: [] }); // Nếu có lỗi, trả về mảng rỗng
  }
};
