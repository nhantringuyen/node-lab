const fs = require("fs");
const path = require("path");

const cartPath = path.join(__dirname, "..", "datas", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Đọc file cart.json
    fs.readFile(cartPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        try {
          cart = JSON.parse(fileContent);
        } catch (e) {
          // File rỗng hoặc lỗi JSON, giữ cart trống
        }
      }

      // Tìm sản phẩm đã có trong giỏ
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        // Nếu sản phẩm đã có => tăng qty
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        // Nếu sản phẩm chưa có => thêm mới
        updatedProduct = { id: id, qty: 1 };
        cart.products.push(updatedProduct);
      }

      cart.totalPrice += +productPrice;

      // Ghi lại file cart.json
      fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
