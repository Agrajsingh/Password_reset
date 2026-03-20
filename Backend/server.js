const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors()); // Enable preflight for all routes

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Direct routes for testing (Bypassing router)
const { register, forgotPassword, resetPassword } = require("./controllers/authController");
app.post("/api/auth/register", register);
app.get("/api/auth/register", (req, res) => res.json({ message: "GET /api/auth/register works. Use POST for registration." }));
app.post("/api/auth/forgot-password", forgotPassword);
app.post("/api/auth/reset-password", resetPassword);

app.use("/api/auth", authRoutes);

// Test routes (Direct)
app.get("/api/test-direct", (req, res) => res.json({ message: "Direct test works" }));

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/password-reset-db",
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Catch-all 404 handler
app.use((req, res) => {
  console.log(`404 at ${req.method} ${req.url}`);
  res.status(404).json({
    message: "Route not found",
    receivedUrl: req.url,
    receivedMethod: req.method
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
