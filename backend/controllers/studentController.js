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
    res.status(500).json({
      success: false,
      message: error.message,
    });
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

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
};