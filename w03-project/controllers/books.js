const Book = require('../models/Book');

// Get all books with optional query parameters
const getAllBooks = async (req, res) => {
  try {
    const { genre, author, page, limit = 10 } = req.query;
    let query = {};
    
    // Build query based on parameters
    if (genre) query.genre = genre;
    if (author) query.author = { $regex: author, $options: 'i' };
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const books = await Book.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ title: 1 });
    
    const total = await Book.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: books.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: books
    });
  } catch (error) {
    console.error('Get all books error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving books from database',
      error: error.message
    });
  }
};

// Get single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Book ID is required'
      });
    }
    
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Get book by ID error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error retrieving book',
      error: error.message
    });
  }
};

// Create new book
const createBook = async (req, res) => {
  try {
    const bookData = req.body;
    
    // Basic validation for required fields
    const requiredFields = ['title', 'author', 'isbn', 'publicationYear', 'genre', 'publisher', 'pageCount'];
    const missingFields = requiredFields.filter(field => !bookData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }
    
    const book = new Book(bookData);
    const savedBook = await book.save();
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: savedBook
    });
  } catch (error) {
    console.error('Create book error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'ISBN already exists in the database'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating book',
      error: error.message
    });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Book ID is required'
      });
    }
    
    // Remove immutable fields
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    
    const book = await Book.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    console.error('Update book error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed during update',
        errors: errors
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format'
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'ISBN already exists in the database'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating book',
      error: error.message
    });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Book ID is required'
      });
    }
    
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: {
        id: book._id,
        title: book.title
      }
    });
  } catch (error) {
    console.error('Delete book error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};