const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("../config/database");
const Institute = require("../models/Institute");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD environment variable is required");
    }

    await connectDB();

    const existingAdmin = await User.findOne({
      role: "institute-admin",
    });

    if (existingAdmin) {
      console.log("Institute Admin already exists");
      process.exit(0);
    }

    const institute = await Institute.create({
      name: "Upsthiti Institute",
      type: "school",
      email: "institute@upsthiti.com",
      phone: "9876543210",
      address: "India",
    });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      fullName: "Institute Admin",
      email: "admin@upsthiti.com",
      password: hashedPassword,
      role: "institute-admin",
      institute: institute._id,
    });

    console.log("Institute Admin Created Successfully");
    process.exit(0);
  } catch (error) {
    console.log("Admin Seed Error:", error.message);
    process.exit(1);
  }
};

createAdmin();