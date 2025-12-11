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

// Protected admin route for categories
router.get('/admin/summary', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: 'Categories admin summary - protected route',
        requiresAuthentication: true,
        userAuthenticated: true
    });
});

// ========== PROTECTED ROUTE (REQUIRES OAUTH) ==========
/**
 * @swagger
 * /api/categories/admin/summary:
 *   get:
 *     summary: Categories admin summary (requires OAuth)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin summary data
 *       401:
 *         description: Unauthorized - requires login
 */
router.get('/admin/summary', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: '🔐 Categories Admin Summary - OAuth Protected',
        protection: 'isAuthenticated middleware applied',
        routeType: 'Protected API endpoint',
        authenticationRequired: true,
        data: {
            totalCategories: 8,
            requiresOAuth: true,
            access: 'Restricted to authenticated users'
        }
    });
});
