const express = require("express");
const router = express.Router();
const {
  register,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.get("/test", (req, res) => res.json({ message: "Auth routes are working" }));
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
