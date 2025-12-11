const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { isAuthenticated } = require('../middleware/auth');

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 */
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 */
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - year
 *               - price
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: number
 *               price:
 *                 type: number
 *               genre:
 *                 type: string
 *               inStock:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

// Protected route that requires OAuth
router.get('/protected/user-info', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: 'Protected route - requires OAuth login',
        authenticated: true,
        user: req.user ? {
            id: req.user.id,
            name: req.user.displayName,
            email: req.user.emails?.[0]?.value
        } : 'User object available after login',
        accessTime: new Date().toISOString()
    });
});

// Another protected route
router.get('/admin/dashboard', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: 'Admin dashboard - protected by OAuth',
        data: {
            totalCollections: 4,
            requiresAuth: true,
            userRole: 'authenticated'
        }
    });
});

// ========== PROTECTED ROUTES (REQUIRE OAUTH) ==========
/**
 * @swagger
 * /api/books/protected/user-info:
 *   get:
 *     summary: Get protected user info (requires OAuth)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected user information
 *       401:
 *         description: Unauthorized - requires login
 */
router.get('/protected/user-info', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: '✅ This route is PROTECTED by OAuth authentication',
        protected: true,
        requiresLogin: true,
        user: req.user ? {
            id: req.user.id,
            name: req.user.displayName || 'Authenticated User',
            email: req.user.emails?.[0]?.value || 'user@example.com'
        } : 'User info available after OAuth login',
        timestamp: new Date().toISOString(),
        status: 'Protected route - OAuth required'
    });
});

/**
 * @swagger
 * /api/books/admin/dashboard:
 *   get:
 *     summary: Admin dashboard (requires OAuth)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data
 *       401:
 *         description: Unauthorized - requires admin login
 */
router.get('/admin/dashboard', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: '🔒 Admin Dashboard - OAuth Protected',
        authentication: 'REQUIRED',
        userStatus: 'Authenticated via OAuth',
        dashboardData: {
            totalBooks: 16,
            totalAuthors: 10,
            totalCategories: 8,
            totalPublishers: 8,
            apiStatus: 'Protected by OAuth'
        },
        accessLevel: 'authenticated_user'
    });
});
