const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewarse/isAuthenticated'); 
const { registerStu, getStudent, getStudentById, updateStudent } = require('../controllers/sensei-studentController');
const uploadFields = require('../config/multer-config');
const authenticateToken = require('../middlewarse/authenticateToken');

// Define routes with correct methods and handlers
router.post('/register' ,authenticateToken ,uploadFields, registerStu);
router.get('/get', getStudent);
router.get('/get/:id', getStudentById);
router.put('/update/:id', updateStudent); // Correct route path

module.exports = router;
