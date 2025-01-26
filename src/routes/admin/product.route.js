const express = require("express");
const router = express.Router();
const path = require('path');
const AdminServiceGuard= require("../../middlewares/auth/admin/admin-auth.middleware")

const productController = require(path.join(process.cwd(), 'src/controllers/admin/product/product.controller.js'));
router.post("/add-product",AdminServiceGuard,productController.addProduct)
router.get("/get-products",AdminServiceGuard,productController.getAllProducts)

module.exports = router