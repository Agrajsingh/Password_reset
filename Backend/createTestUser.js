const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function createTestUser() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/password-reset-db",
    );
    console.log("Connected to MongoDB");

    const email = "testuser@example.com";
    const password = "oldpassword123";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Test user already exists");
    } else {
      const user = new User({ email, password });
      await user.save();
      console.log("Test user created successfully");
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error creating test user:", err);
  }
}

createTestUser();
