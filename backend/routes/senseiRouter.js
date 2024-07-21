const express = require('express');
const router = express.Router();
const { createSensei } = require('../controllers/authController')
const upload = require('../config/multer-config'); // Multer configuration

router.post('/create', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
]), createSensei);

module.exports = router;
