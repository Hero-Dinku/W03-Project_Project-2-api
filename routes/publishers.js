const express = require('express');
const router = express.Router();
const {
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher
} = require('../controllers/publishers');
const { isAuthenticated } = require('../middleware/auth');

// Public routes
router.get('/', getAllPublishers);
router.get('/:id', getPublisherById);

// Protected routes (require authentication)
router.post('/', isAuthenticated, createPublisher);
router.put('/:id', isAuthenticated, updatePublisher);
router.delete('/:id', isAuthenticated, deletePublisher);

module.exports = router;
