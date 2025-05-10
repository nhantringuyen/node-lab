const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router.get("/", productController.getAllProducts);
router.post("/add", productController.addProduct);

module.exports = router;
