const Student = require("../models/Student");

const createStudent = async (req, res) => {
  try {
    const { fullName, rollNumber, gender, phone, email, classId } = req.body;

    if (!req.user || !req.user.institute) {
      return res.status(400).json({
        success: false,
        message: "Institute not found for this user.",
      });
    }

    if (!fullName || !rollNumber || !gender || !classId) {
      return res.status(400).json({
        success: false,
        message: "Full name, roll number, gender and class are required.",
      });
    }

    const duplicateRoll = await Student.findOne({
      institute: req.user.institute,
      class: classId,
      rollNumber,
      isActive: true,
    });

    if (duplicateRoll) {
      return res.status(409).json({
        success: false,
        message: "Roll number already exists in this class.",
      });
    }

    if (email) {
      const duplicateEmail = await Student.findOne({
        institute: req.user.institute,
        email,
        isActive: true,
      });

      if (duplicateEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already exists.",
        });
      }
    }

    const student = await Student.create({
      institute: req.user.institute,
      class: classId,
      fullName,
      rollNumber,
      gender,
      phone,
      email,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      institute: req.user.institute,
      isActive: true,
    })
      .populate("class", "name section department academicYear")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      institute: req.user.institute,
      isActive: true,
    }).populate("class", "name section department academicYear");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { classId, rollNumber, email, ...studentData } = req.body;

    const duplicateRoll = await Student.findOne({
      _id: { $ne: req.params.id },
      institute: req.user.institute,
      class: classId,
      rollNumber,
      isActive: true,
    });

    if (duplicateRoll) {
      return res.status(409).json({
        success: false,
        message: "Roll number already exists in this class.",
      });
    }

    if (email) {
      const duplicateEmail = await Student.findOne({
        _id: { $ne: req.params.id },
        institute: req.user.institute,
        email,
        isActive: true,
      });

      if (duplicateEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already exists.",
        });
      }
    }

    const updatedStudent = await Student.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
      },
      {
        ...studentData,
        rollNumber,
        email,
        class: classId,
      },
      { new: true }
    ).populate("class", "name section department academicYear");

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
      },
      { isActive: false },
      { new: true }
    );

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStudentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments({
      institute: req.user.institute,
      isActive: true,
    });

    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentCount,
};