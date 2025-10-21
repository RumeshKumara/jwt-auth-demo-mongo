const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        trim: true,  // Removes whitespace
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,  // Converts to lowercase
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
}, {
    timestamps: true,  // Adds createdAt/updatedAt fields
});

// Hash password before saving (Mongoose middleware)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);  // Creates 'users' collection