const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Register API
exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Received register request for: ${email}`);
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Registration failed, user already exists: ${email}`);
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    console.log(`Successfully registered new user: ${email}`);
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(`Error in register: ${err.message}`);
    res.status(500).json({ message: "Server error during registration", error: err.message });
  }
};

// Forgot Password API
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(`Received forgot password request for: ${email}`);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email (using ethereal for testing)
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/#/reset-password/${token}`;
    const mailOptions = {
      from: '"Secure Auth" <no-reply@secureauth.com>',
      to: user.email,
      subject: "Password Reset Request",
      text: `Hi,\n\nYou requested a password reset. Please click on the following link to reset your password: ${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #007bff; text-align: center;">Password Reset Request</h2>
          <p>Hi there,</p>
          <p>You recently requested to reset your password for your account. Click the button below to proceed:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p>Alternatively, you can copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;"><a href="${resetUrl}">${resetUrl}</a></p>
          <p><strong>Note:</strong> This link is valid for 1 hour. If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #777; text-align: center;">&copy; 2026 Secure Auth Service. All rights reserved.</p>
        </div>
      `,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.json({ message: "A password reset link has been sent to your email." });
  } catch (err) {
    console.error(`Error in forgotPassword: ${err.message}`);
    res.status(500).json({ message: "Server error. Please try again later.", error: err.message });
  }
};

// Reset Password API
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  console.log(`Received reset password request for token: ${token}`);
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log(`Invalid or expired token: ${token}`);
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    console.log(`Password updated for user: ${user.email}`);
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(`Error in resetPassword: ${err.message}`);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
