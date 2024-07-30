const express = require('express');
const router = express.Router();
// const isAuthenticated = require('../middlewarse/isAuthenticated'); 
const { registerStu, getStudent, getStudentById, updateStudent } = require('../controllers/sensei-studentController');

// Define routes with correct methods and handlers
router.post('/register', registerStu); // Correct the route to /register
router.get('/get', getStudent);
router.get('/get/:id', getStudentById);
router.put('/update/:id', updateStudent); // Correct route path

module.exports = router;
