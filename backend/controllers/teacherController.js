const Teacher = require("../models/Teacher");

const createTeacher = async (req, res) => {
  try {
    const { fullName, email, phone, gender, department, qualification } = req.body;

    if (!req.user || !req.user.institute) {
      return res.status(400).json({
        success: false,
        message: "Institute not found for this user.",
      });
    }

    if (!fullName || !gender) {
      return res.status(400).json({
        success: false,
        message: "Full name and gender are required.",
      });
    }

    if (email) {
      const existingTeacher = await Teacher.findOne({
        institute: req.user.institute,
        email,
        isActive: true,
      });

      if (existingTeacher) {
        return res.status(409).json({
          success: false,
          message: "Teacher email already exists.",
        });
      }
    }

    const teacher = await Teacher.create({
      institute: req.user.institute,
      fullName,
      email,
      phone,
      gender,
      department,
      qualification,
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({
      institute: req.user.institute,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTeacherCount = async (req, res) => {
  try {
    const count = await Teacher.countDocuments({
      institute: req.user.institute,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherCount,
};