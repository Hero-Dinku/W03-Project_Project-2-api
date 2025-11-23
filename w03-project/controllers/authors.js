const Author = require('../models/Author');

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const { nationality, active, page, limit = 10 } = req.query;
    let query = {};
    
    if (nationality) query.nationality = { $regex: nationality, $options: 'i' };
    if (active !== undefined) query.isActive = active === 'true';
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const authors = await Author.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ lastName: 1, firstName: 1 });
    
    const total = await Author.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: authors.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: authors
    });
  } catch (error) {
    console.error('Get all authors error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving authors from database',
      error: error.message
    });
  }
};

// Get single author by ID
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Author ID is required'
      });
    }
    
    const author = await Author.findById(id);
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: `Author with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: author
    });
  } catch (error) {
    console.error('Get author by ID error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid author ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error retrieving author',
      error: error.message
    });
  }
};

// Create new author
const createAuthor = async (req, res) => {
  try {
    const authorData = req.body;
    
    // Basic validation for required fields
    const requiredFields = ['firstName', 'lastName', 'birthDate', 'nationality'];
    const missingFields = requiredFields.filter(field => !authorData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }
    
    const author = new Author(authorData);
    const savedAuthor = await author.save();
    
    res.status(201).json({
      success: true,
      message: 'Author created successfully',
      data: savedAuthor
    });
  } catch (error) {
    console.error('Create author error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating author',
      error: error.message
    });
  }
};

// Update author
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Author ID is required'
      });
    }
    
    // Remove immutable fields
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    
    const author = await Author.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }
    );

    if (!author) {
      return res.status(404).json({
        success: false,
        message: `Author with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Author updated successfully',
      data: author
    });
  } catch (error) {
    console.error('Update author error:', error);
    
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
        message: 'Invalid author ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating author',
      error: error.message
    });
  }
};

// Delete author
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Author ID is required'
      });
    }
    
    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: `Author with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Author deleted successfully',
      data: {
        id: author._id,
        fullName: author.fullName
      }
    });
  } catch (error) {
    console.error('Delete author error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid author ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting author',
      error: error.message
    });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};