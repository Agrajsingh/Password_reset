const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
