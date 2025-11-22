const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [1, 'First name must be at least 1 character long'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [1, 'Last name must be at least 1 character long'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  birthDate: {
    type: Date,
    required: [true, 'Birth date is required'],
    validate: {
      validator: function(date) {
        return date < new Date();
      },
      message: 'Birth date cannot be in the future'
    }
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true,
    minlength: [1, 'Nationality must be at least 1 character long'],
    maxlength: [50, 'Nationality cannot exceed 50 characters']
  },
  biography: {
    type: String,
    maxlength: [2000, 'Biography cannot exceed 2000 characters'],
    default: ''
  },
  awards: [{
    type: String,
    trim: true,
    maxlength: [100, 'Award name cannot exceed 100 characters']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for full name - FIXED TEMPLATE LITERAL
authorSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

// Ensure virtual fields are serialized
authorSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Author', authorSchema);
