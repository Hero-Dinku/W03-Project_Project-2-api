const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title must be at least 1 character long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    minlength: [1, 'Author must be at least 1 character long'],
    maxlength: [100, 'Author cannot exceed 100 characters']
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^(?:\d{10}|\d{13})$/.test(v);
      },
      message: 'ISBN must be 10 or 13 digits'
    }
  },
  publicationYear: {
    type: Number,
    required: [true, 'Publication year is required'],
    min: [1000, 'Publication year must be after 1000'],
    max: [new Date().getFullYear(), 'Publication year cannot be in the future'],
    validate: {
      validator: Number.isInteger,
      message: 'Publication year must be an integer'
    }
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: {
      values: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Biography', 'History', 'Fantasy', 'Romance', 'Thriller', 'Young Adult'],
      message: '{VALUE} is not a valid genre'
    }
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required'],
    trim: true,
    minlength: [1, 'Publisher must be at least 1 character long'],
    maxlength: [100, 'Publisher cannot exceed 100 characters']
  },
  pageCount: {
    type: Number,
    required: [true, 'Page count is required'],
    min: [1, 'Page count must be at least 1'],
    max: [10000, 'Page count cannot exceed 10000'],
    validate: {
      validator: Number.isInteger,
      message: 'Page count must be an integer'
    }
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: ''
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
bookSchema.index({ title: 1, author: 1 });
bookSchema.index({ isbn: 1 }, { unique: true });

module.exports = mongoose.model('Book', bookSchema);