const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');
const { isAuthenticated } = require('../middleware/auth');

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Protected routes (require authentication)
router.post('/', isAuthenticated, createCategory);
router.put('/:id', isAuthenticated, updateCategory);
router.delete('/:id', isAuthenticated, deleteCategory);

module.exports = router;
