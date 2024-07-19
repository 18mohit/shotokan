const ownerModel = require('../models/Owner-model');
const generateToken = require('../utils/generatetoken');

const loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const owner = await ownerModel.findOne({ email });

        if (!owner) {
            return res.status(400).json({ msg: 'Email or password is incorrect' });
        }

        const isMatch = await owner.validatePassword(password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Email or password is incorrect' });
        }

        const token = generateToken(owner);
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const createOwner = async (req, res) => {
    try {
        const ownerCount = await ownerModel.countDocuments();
        if (ownerCount >= 10) {
            return res.status(502).json({ msg: 'You cannot create a new owner' });
        }

        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).send('All fields (fullname, email, and password) are required');
        }

        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });

        const token = generateToken(createdOwner);
        res.cookie('token', token);
        res.status(201).json({ msg: 'Owner Created' });
    } catch (error) {
        console.error('Creation error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { loginOwner, createOwner };
