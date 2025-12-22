const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

const router = express.Router();

// Multer Setup
const upload = multer({ dest: 'uploads/' });

// User Routes
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteUser);

// Category Routes
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.get('/categories/:id', categoryController.getCategory);
router.get('/categories', categoryController.getCategories);
// router.delete('/categories/:id', categoryController.deleteCategory); // Optional based on requirements

// Product Routes
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.get('/products', productController.listProducts);
router.get('/products/:id', productController.getProduct);
router.delete('/products/:id', productController.deleteProduct);
router.post('/products/upload', upload.single('file'), productController.bulkUpload);
router.get('/products/report', productController.generateReport);

module.exports = router;
