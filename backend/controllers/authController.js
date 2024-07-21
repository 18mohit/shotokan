const ownerModel = require('../models/Owner-model');
const generateToken = require('../utils/generatetoken');
const senseiModel = require('../models/Seinsei-model');

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
        return res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const logoutOwner = async (req,res) => {
    res.cookie('token', '');
    res.redirect('/');
};

const createSensei = async (req, res) => { 
    try {
        let { fullname, email, password } = req.body;
        let createdSensei = await senseiModel.create({
            photo: req.files.photo[0].buffer, // Access 'photo' file buffer
            certificate: req.files.certificate[0].buffer, // Access 'certificate' file buffer
            fullname,
            email,
            password
        });
        res.status(201).send(createdSensei);
        console.log(createdSensei);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { loginOwner, createOwner, logoutOwner, createSensei };
