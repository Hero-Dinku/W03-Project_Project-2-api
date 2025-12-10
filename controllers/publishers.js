const Publisher = require('../models/Publisher');

// Get all publishers
exports.getAllPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.json({
            success: true,
            count: publishers.length,
            data: publishers
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Get single publisher
exports.getPublisherById = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publisher not found' 
            });
        }
        res.json({ success: true, data: publisher });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Create publisher
exports.createPublisher = async (req, res) => {
    try {
        const publisher = new Publisher(req.body);
        await publisher.save();
        res.status(201).json({ 
            success: true, 
            data: publisher 
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation error',
                errors: Object.values(error.errors).map(e => e.message)
            });
        }
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Update publisher
exports.updatePublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!publisher) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publisher not found' 
            });
        }
        res.json({ success: true, data: publisher });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation error',
                errors: Object.values(error.errors).map(e => e.message)
            });
        }
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Delete publisher
exports.deletePublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findByIdAndDelete(req.params.id);
        if (!publisher) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publisher not found' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Publisher deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};
