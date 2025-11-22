const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simple test routes without external dependencies
app.get('/', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

app.get('/api/books', (req, res) => {
  res.json({ success: true, count: 0, data: [], message: 'Books endpoint - no database connection' });
});

app.post('/api/books', (req, res) => {
  res.status(201).json({ 
    success: true, 
    message: 'Book created (placeholder)', 
    data: { ...req.body, _id: 'temp_id', createdAt: new Date() }
  });
});

// Basic MongoDB connection with better error handling
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Connected to MongoDB');
      
      // Replace with actual routes after successful connection
      const Book = require('./models/Book');
      const Author = require('./models/Author');
      const bookRoutes = require('./routes/books');
      const authorRoutes = require('./routes/authors');
      
      app.use('/api/books', bookRoutes);
      app.use('/api/authors', authorRoutes);
      
      console.log('✅ CRUD routes loaded');
    } else {
      console.log('⚠️  No MongoDB URI - running in test mode');
    }
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    console.log('⚠️  Running without database - basic routes only');
  }
};

connectDB();

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Server running on port ' + PORT);
  console.log('📍 http://localhost:' + PORT);
});

// Better error handling
process.on('uncaughtException', (error) => {
  console.log('🛑 Uncaught Exception:', error.message);
  console.log('Server will continue running with basic routes');
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('🛑 Unhandled Rejection at:', promise, 'reason:', reason);
});
