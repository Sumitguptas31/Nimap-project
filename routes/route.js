var express = require('express');
var router = express.Router();
const productController = require("../controller/productController")
const categoryController = require("../controller/categoryController")
router.post('/add-products',productController.addProduct)
router.get('/get-all-products',productController.getAllProduct)
router.get('/products/:id',productController.getProductById)
router.patch('/products/:id',productController.updateProducts)
router.delete('/products/:id',productController.deleteProducts)


router.post('/categories', categoryController.addCategories);
router.get('/categories',categoryController.getAllCategories);
router.get('/categories/:categories_id', categoryController.getCategoriesById);
router.patch('/update-categories/:categories_id', categoryController.updateCategories);
router.delete('/categories/:categories_id', categoryController.deleteCategories);
module.exports = router