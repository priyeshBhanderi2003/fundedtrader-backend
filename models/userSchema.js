const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true,
    },
    privacyPolicy: {
        type: Number,
        default: 0, // Default to 0 (false)
    },
    newsletter: {
        type: Number,
        default: 0, // Default to 0 (false)
    },
    nameVerification: {
        type: Number,
        default: 0, // Default to 0 (false)
    },

});

userSchema.pre('save', async function (next) {
    this.privacyPolicy = this.privacyPolicy ? 1 : 0;
    this.newsletter = this.newsletter ? 1 : 0;
    this.nameVerification = this.nameVerification ? 1 : 0;
    if (this.isModified('password')) {
        // Hash the password and confirmPassword
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
    }

    next();
});


const User = mongoose.model('users', userSchema);

module.exports = User;