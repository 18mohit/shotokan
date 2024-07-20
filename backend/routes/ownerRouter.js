const express = require('express');
const router = express.Router();
const { createOwner, loginOwner, logoutOwner } = require('../controllers/authController');

// Middleware to parse JSON body
router.use(express.json());

router.post('/owner', createOwner);
router.post('/owner/login', loginOwner);
router.get('/logout', logoutOwner); 

module.exports = router;
