const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Start Google OAuth login
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth
 */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to home page after login
 */
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/auth/success');
  }
);

/**
 * @swagger
 * /auth/success:
 *   get:
 *     summary: Login success page
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.get('/success', (req, res) => {
  res.json({
    success: true,
    message: 'Login successful!',
    user: req.user
  });
});

/**
 * @swagger
 * /auth/failure:
 *   get:
 *     summary: Login failure page
 *     tags: [Authentication]
 *     responses:
 *       401:
 *         description: Login failed
 */
router.get('/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Google login failed'
  });
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Logout error'
      });
    }
    res.json({
      success: true,
      message: 'Logout successful!'
    });
  });
});

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get current user info
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Returns user info if logged in
 *       401:
 *         description: Not authenticated
 */
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
});

module.exports = router;
