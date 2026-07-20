const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

const user = await User.findOne({
  email,
  isActive: true,
}).populate("institute");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        institute: user.institute,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email,
      isActive: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No active account found with this email",
      });
    }

    // Secure 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    // Database me plain OTP nahi, hashed OTP save hoga
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.resetPasswordOtp = hashedOtp;
    user.resetPasswordOtpExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );
    user.resetPasswordOtpVerified = false;

    await user.save();

    try {
      await sendEmail(
        user.email,
        "Upsthiti Password Reset OTP",
        `
          <div style="font-family: Arial, sans-serif; padding: 24px;">
            <h2 style="color: #2563eb;">Upsthiti Password Reset</h2>

            <p>Hello ${user.fullName},</p>

            <p>Your password reset OTP is:</p>

            <div
              style="
                display: inline-block;
                padding: 14px 24px;
                margin: 12px 0;
                background: #eff6ff;
                border-radius: 8px;
                font-size: 30px;
                font-weight: bold;
                letter-spacing: 6px;
                color: #1d4ed8;
              "
            >
              ${otp}
            </div>

            <p>This OTP will expire in 10 minutes.</p>

            <p>If you did not request this, you can ignore this email.</p>

            <p>Regards,<br />Upsthiti Team</p>
          </div>
        `
      );
    } catch (emailError) {
      user.resetPasswordOtp = null;
      user.resetPasswordOtpExpires = null;
      console.error("OTP email sending error:", emailError.message);
      user.resetPasswordOtpVerified = false;

      await user.save();

      return res.status(500).json({
        success: false,
        message: "Unable to send OTP email. Please try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Forgot password error",
      error: error.message,
    });
  }
};
const verifyOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const otp = req.body.otp?.trim();

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({
      email,
      isActive: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Active user account not found",
      });
    }

    if (
      !user.resetPasswordOtp ||
      !user.resetPasswordOtpExpires
    ) {
      return res.status(400).json({
        success: false,
        message: "Please request a new OTP",
      });
    }

    if (user.resetPasswordOtpExpires.getTime() < Date.now()) {
      user.resetPasswordOtp = null;
      user.resetPasswordOtpExpires = null;
      user.resetPasswordOtpVerified = false;

      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP",
      });
    }

    const isOtpValid = await bcrypt.compare(
      otp,
      user.resetPasswordOtp
    );

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.resetPasswordOtpVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OTP verification error",
      error: error.message,
    });
  }
};const resetPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const newPassword = req.body.newPassword?.trim();
    const confirmPassword = req.body.confirmPassword?.trim();

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Email, new password and confirm password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({
      email,
      isActive: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Active user account not found",
      });
    }

    if (!user.resetPasswordOtpVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    if (
      !user.resetPasswordOtpExpires ||
      user.resetPasswordOtpExpires.getTime() < Date.now()
    ) {
      user.resetPasswordOtp = null;
      user.resetPasswordOtpExpires = null;
      user.resetPasswordOtpVerified = false;

      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP session has expired. Please request a new OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpires = null;
    user.resetPasswordOtpVerified = false;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Password reset error",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
};