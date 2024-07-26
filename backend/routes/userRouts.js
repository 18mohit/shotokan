const express = require('express');
const router = express.Router();
const { register, login, logout, updateProfile } = require('../controllers/userConrtoller'); 
const isAuthenticated = require('../middlewarse/isAuthenticated'); 

// Define routes with correct methods and handlers
router.post('/register', register); // Correct the route to /register
router.post('/login', login);
router.get('/logout', logout);
router.post('/profile/update', isAuthenticated, updateProfile); // Correct route path

module.exports = router;
