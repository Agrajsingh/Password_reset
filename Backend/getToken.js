const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function getToken() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/password-reset-db",
    );
    const user = await User.findOne({ email: "testuser@example.com" });
    if (user && user.resetToken) {
      console.log(`TOKEN_START:${user.resetToken}:TOKEN_END`);
    } else {
      console.log("Token not found");
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

getToken();
