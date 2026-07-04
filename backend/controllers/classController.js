const Class = require("../models/Class");

const createClass = async (req, res) => {
  try {
    const { name, section, department, academicYear } = req.body;

    if (!req.user || !req.user.institute) {
      return res.status(400).json({
        success: false,
        message: "Institute not found for this user. Please login with institute admin account.",
      });
    }

    if (!name || !section || !academicYear) {
      return res.status(400).json({
        success: false,
        message: "Class name, section and academic year are required.",
      });
    }

    const newClass = await Class.create({
      institute: req.user.institute,
      name,
      section,
      department,
      academicYear,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    console.error("Create Class Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createClass,
};