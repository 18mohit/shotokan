const express = require('express');
const router = express.Router();
const ownerModel = require('../models/Owner-model');

router.get('/create' , async (req, res) => {
    let owner = await ownerModel.find();
    if(owner.length > 0) {
        return res.status(502).send('you dont create new owner');
    } else {
        let { fullname, email, password } = req.body;
        let createdOwner = ownerModel.create({
            fullname,
            email,
            password
        });
        res.status(201).send("owner created");
    }
});

module.exports = router;