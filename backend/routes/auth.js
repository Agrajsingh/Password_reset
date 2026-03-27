const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Generate test account for nodemailer on startup
let etherealUser = null;
let etherealPass = null;
const nodemailer = require('nodemailer');
nodemailer.createTestAccount((err, account) => {
    if (account) {
        etherealUser = account.user;
        etherealPass = account.pass;
        console.log("Ethereal Test Credentials Setup Complete.");
    }
});

router.post('/register', async (req, res) => {
    console.log('Registration request body:', req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await User.create({ email, password: passwordHash });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error("Registration Error Details:", error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );
        
        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User with that email does not exist.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetToken = tokenHash;
        user.resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour expiry
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        const mailOptions = {
            email: user.email,
            subject: 'Password Reset Token',
            message: message,
            html: `<p>You are receiving this email because you (or someone else) have requested the reset of a password.</p><p>Please click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
        };

        // Override with ethereal credentials if not provided in env
        if(!process.env.SMTP_EMAIL && etherealUser) {
           process.env.SMTP_EMAIL = etherealUser;
           process.env.SMTP_PASSWORD = etherealPass;
           process.env.SMTP_HOST = 'smtp.ethereal.email';
           process.env.SMTP_PORT = 587;
        }

        await sendEmail(mailOptions);
        
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        if (user) {
            user.resetToken = null;
            user.resetTokenExpiry = null;
            await user.save();
        }
        res.status(500).json({ message: 'Email could not be sent.' });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetToken: tokenHash,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired password reset token' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.status(200).json({ message: 'Password reset successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
