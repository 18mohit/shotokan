const express = require('express');
const router = express.Router();
const ownerModel = require('../models/Owner-model');

// Middleware to parse JSON body
router.use(express.json());

router.get('/owner', async (req, res) => {
    try {
        let owner = await ownerModel.find();
        if (owner.length > 10) {
            return res.status(502).json({msg: 'You cannot create a new owner '});
        } else {
            let { fullname, email, password } = req.body; // Using req.body for POST requests
            
            // Checking if all required fields are provided
            if (!fullname || !email || !password) {
                return res.status(400).send('All fields (fullname, email, and password) are required');
            }
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password
            });
            res.status(201).json({msg: 'Owner Created '});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
