const mongoose = require('mongoose');

const senseiSchema = mongoose.Schema({
    fullname: {
        type:String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    photo: String,
    cercertificate: String
});

module.exports = mongoose.model('sensei', senseiSchema);