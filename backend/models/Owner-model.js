// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const ownerSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         minLength: 3,
//         trim: true,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// // Hash the password before saving the owner
// ownerSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Method to compare the entered password with the hashed password in the database
// ownerSchema.methods.validatePassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('Owner', ownerSchema);
