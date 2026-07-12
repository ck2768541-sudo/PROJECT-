const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "institute-admin",
        "teacher",
        "student",
      ],
    },

    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Forgot Password OTP
    resetPasswordOtp: {
      type: String,
      default: null,
    },

    resetPasswordOtpExpires: {
      type: Date,
      default: null,
    },

    resetPasswordOtpVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);