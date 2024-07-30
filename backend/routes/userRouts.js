const express = require('express');
const router = express.Router();
const { register, login, logout, updateProfile } = require('../controllers/userConrtoller'); 
const uploadFields = require('../config/multer-config');

// Define routes with correct methods and handlers
router.post('/register', uploadFields, register); 
router.post('/login', login);
router.get('/logout', logout);
router.post('/profile/update',uploadFields , updateProfile); 

module.exports = router;
