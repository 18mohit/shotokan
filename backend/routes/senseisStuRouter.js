const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewarse/isAuthenticated'); 
const { registerStu, getStudent, getStudentById, updateStudent } = require('../controllers/sensei-studentController');

// Define routes with correct methods and handlers
router.post('/register', isAuthenticated, registerStu); // Correct the route to /register
router.get('/get', isAuthenticated, getStudent);
router.get('/get/:id', isAuthenticated, getStudentById);
router.put('/update/:id', isAuthenticated, updateStudent); // Correct route path

module.exports = router;
