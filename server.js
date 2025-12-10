const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Session and OAuth
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

// Routes
const authorRoutes = require("./routes/authors");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const categoryRoutes = require("./routes/categories");
const publisherRoutes = require("./routes/publishers");

const { isAuthenticated } = require("./middleware/auth");
const swaggerDocs = require("./swagger/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production with HTTPS
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/publishers", publisherRoutes);

// Swagger Documentation
swaggerDocs(app);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "W06 Project API with 4 Collections is running!",
    version: "1.0.0",
    endpoints: {
      auth: "/auth",
      books: "/api/books",
      authors: "/api/authors",
      categories: "/api/categories",
      publishers: "/api/publishers",
      documentation: "/api-docs",
    },
    authenticated: req.isAuthenticated(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// MongoDB Connection
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/w03-project");
    console.log("✅ Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Local: http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`🔐 OAuth available at: http://localhost:${PORT}/auth/google`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;
