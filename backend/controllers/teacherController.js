const Teacher = require("../models/Teacher");

const createTeacher = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      department,
      qualification,
      assignedClasses,
      subjects,
    } = req.body;

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
      assignedClasses: assignedClasses || [],
      subjects: subjects || [],
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
    })
      .populate("assignedClasses", "name section department academicYear")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      _id: req.params.id,
      institute: req.user.institute,
      isActive: true,
    }).populate("assignedClasses", "name section department academicYear");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { email } = req.body;

    if (email) {
      const existingTeacher = await Teacher.findOne({
        _id: { $ne: req.params.id },
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

    const teacher = await Teacher.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
      },
      req.body,
      { new: true }
    ).populate("assignedClasses", "name section department academicYear");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
      },
      { isActive: false },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
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
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherCount,
};