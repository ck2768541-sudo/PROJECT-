const express = require("express");

const {
  login,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/authController");

const {
  loginValidator,
  validateRequest,
} = require("../validators/authValidator");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/login",
  loginValidator,
  validateRequest,
  login
);

// Forgot Password
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

// Protected Route
router.get(
  "/me",
  protect,
  getMe
);

module.exports = router;