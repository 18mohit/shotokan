const express = require('express');
const router = express.Router();
const senseiModel = require('../models/Seinsei-model');
const upload = require('../config/multer-config'); // Multer configuration

router.post('/create', 
    upload.single("photo"), // Handle single file upload for 'photo'
    upload.single("certificate"), // Handle single file upload for 'cercertificate'
    async (req, res) => { 
        try {
            let { fullname, email, password } = req.body;
            let createdSensei = await senseiModel.create({
                photo: req.file.buffer, // Access 'photo' file buffer
                certificate: req.file.buffer, // Access 'cercertificate' file buffer
                fullname,
                email,
                password
            });
            res.status(201).send(createdSensei);
            console.log(createdSensei);
        } catch (error) {
            res.status(500).send(error.message); // Sending error message
        }
});

module.exports = router;
