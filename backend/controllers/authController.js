const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create user (Mongoose auto-hashes password)
        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT (use _id from MongoDB)
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.dashboard = (req, res) => {
    // req.user from middleware
    res.json({ message: 'Welcome to the dashboard!', user: req.user });
};