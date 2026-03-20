const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/password-reset-db",
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/auth", authRoutes);

app.get("/api/auth-check", (req, res) => {
  res.json({ message: "Direct API check is working" });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
