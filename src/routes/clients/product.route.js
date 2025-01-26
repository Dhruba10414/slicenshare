const express = require("express");
const router = express.Router();
const path = require('path');
const productController =  require(path.join(process.cwd(), 'src/controllers/client/product.controller.js'));

router.get("/products/get-all", productController.getAllProducts);

module.exports = router;