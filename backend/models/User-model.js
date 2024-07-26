const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:["Student", "Sensei", "Owner"],
        require:true
    },
    profile:{
        bio: {type: String},
        skills: {type: String},
        photo: {type: String},
        photoOriginalNmae:{type:String},
        certificate: {type: String},
        certificateOriginalNmae:{type:String},
        location: {type: String}
    },
    Students: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SenseiStu',
        require: true,
        }], 
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
