const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();

// Test if env variables are loaded
console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET);
console.log('SESSION_SECRET exists:', !!process.env.SESSION_SECRET);

// Basic session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'test',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get('/test-oauth', (req, res) => {
  res.json({
    hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasSessionSecret: !!process.env.SESSION_SECRET,
    googleIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0
  });
});

app.listen(3001, () => {
  console.log('Test server on port 3001');
});
