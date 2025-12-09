const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    pages: {
        type: Number
    },
    rating: {
        type: Number
    },
    isbn: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'books' // This ensures it uses your existing 'books' collection
});

module.exports = mongoose.model('Book', bookSchema, 'books');
