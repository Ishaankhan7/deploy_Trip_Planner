const express = require('express');
const router = express.Router();
const { signup, verifyOTP, signin, resendOTP, updatePassword, requestPasswordReset, resetPassword } = require('../Controllers/authController'); 
const rateLimiter = require('../Middleware/rateLimiter');
const passport = require('passport');
const verifyToken = require('../Middleware/verifyToken');


router.post('/api/user/signup', rateLimiter, signup);

router.post('/api/user/verify-otp', verifyOTP);

router.post('/api/user/resend-otp', rateLimiter, resendOTP);

router.post('/api/user/signin', signin);

// Google Auth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google OAuth login
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard'); // Redirect to dashboard or another route after login
});


// Facebook Auth
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

// Apple Auth
router.get('/auth/apple', passport.authenticate('apple'));
router.get('/auth/apple/callback', passport.authenticate('apple', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

router.put('/api/user/update-password', verifyToken, updatePassword);
router.post('/api/user/forgot-password', requestPasswordReset);
router.post('/api/user/reset-password/:token', resetPassword);

module.exports = router;
