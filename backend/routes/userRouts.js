const express = require('express');
const router = express.Router();
const { register, login, logout, updateProfile } = require('../controllers/userConrtoller'); 
const isAuthenticated = require('../middlewarse/isAuthenticated'); 
const upload = require('../middlewarse/multer')

// Define routes with correct methods and handlers
router.post('/register', upload, register); 
router.post('/login', login);
router.get('/logout', logout);
router.post('/profile/update', isAuthenticated, updateProfile); 

module.exports = router;
