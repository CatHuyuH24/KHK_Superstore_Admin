function updateSort() {
  const sortValue = document.getElementById("sort").value;
  let url = new URL(window.location.href); // Tạo một URL đối tượng từ URL hiện tại

  if (sortValue) {
    url.searchParams.set("sortBy", sortValue); // Thêm hoặc cập nhật query parameter 'sortBy'
  } else {
    url.searchParams.delete("sortBy"); // Xóa 'sortBy' nếu giá trị là mặc định
  }

  window.location.href = url.toString(); // Thay đổi URL mà không tải lại trang
}

function applyFilters() {
  const brandForm = document.getElementById("brand-filter-form");
  const priceForm = document.getElementById("price-filter-form");
  const brandFormData = new FormData(brandForm);
  const priceFormData = new FormData(priceForm);
  let url = new URL(window.location.href);

  // Clear existing brand filters
  url.searchParams.delete("brands");

  // Add selected brands to URL
  brandFormData.getAll("brands").forEach((brand) => {
    url.searchParams.append("brands", brand);
  });

  // Add price filters to URL
  const minPrice = priceFormData.get("min");
  const maxPrice = priceFormData.get("max");
  if (minPrice) {
    url.searchParams.set("min", minPrice);
  } else {
    url.searchParams.delete("min");
  }
  if (maxPrice) {
    url.searchParams.set("max", maxPrice);
  } else {
    url.searchParams.delete("max");
  }

  window.location.href = url.toString();
}
