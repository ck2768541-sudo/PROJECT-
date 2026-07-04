const express = require("express");

const {
  signup,
  login,
  getMe,
} = require("../controllers/authController");

const {
  signupValidator,
  loginValidator,
  validateRequest,
} = require("../validators/authValidator");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post(
  "/signup",
  signupValidator,
  validateRequest,
  signup
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  login
);

// Protected Route
router.get(
  "/me",
  protect,
  getMe
);

module.exports = router;
