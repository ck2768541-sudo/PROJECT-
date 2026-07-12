const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Institute = require("../models/Institute");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const registerInstitute = async (req, res) => {
  try {
    const {
      instituteName,
      instituteType,
      instituteEmail,
      institutePhone,
      instituteAddress,
      adminName,
      adminEmail,
      adminPassword,
    } = req.body;

    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhone ||
      !adminName ||
      !adminEmail ||
      !adminPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const existingInstitute = await Institute.findOne({
      email: instituteEmail,
    });

    if (existingInstitute) {
      return res.status(409).json({
        success: false,
        message: "Institute email already exists",
      });
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin email already exists",
      });
    }

    const institute = await Institute.create({
      name: instituteName,
      type: instituteType || "school",
      email: instituteEmail,
      phone: institutePhone,
      address: instituteAddress || "",
    });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      fullName: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "institute-admin",
      institute: institute._id,
    });

    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: "Institute registered successfully",
      token,
      institute,
      user: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        institute: admin.institute,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyInstitute = async (req, res) => {
  try {
    const institute = await Institute.findById(req.user.institute);

    if (!institute) {
      return res.status(404).json({
        success: false,
        message: "Institute not found",
      });
    }

    res.status(200).json({
      success: true,
      institute,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerInstitute,
  getMyInstitute,
};