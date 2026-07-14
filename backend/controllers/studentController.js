const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Attendance = require("../models/Attendance");

const createStudent = async (req, res) => {
  try {
    const {
      fullName,
      rollNumber,
      gender,
      phone,
      email,
      classId,
      password,
    } = req.body;

    if (!req.user || !req.user.institute) {
      return res.status(400).json({
        success: false,
        message: "Institute not found for this user.",
      });
    }

    if (
      !fullName ||
      !rollNumber ||
      !gender ||
      !phone ||
      !email ||
      !classId ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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

    const duplicateStudentEmail = await Student.findOne({
      institute: req.user.institute,
      email,
      isActive: true,
    });

    if (duplicateStudentEmail) {
      return res.status(409).json({
        success: false,
        message: "Student email already exists.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Login email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: "student",
      institute: req.user.institute,
    });

    const student = await Student.create({
      institute: req.user.institute,
      class: classId,
      fullName,
      rollNumber,
      gender,
      phone,
      email,
      user: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully with login account",
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
      .populate("user", "fullName email role isActive")
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
    })
      .populate("class", "name section department academicYear")
      .populate("user", "fullName email role isActive");

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
    const { classId, rollNumber, email, password, ...studentData } = req.body;

    const student = await Student.findOne({
      _id: req.params.id,
      institute: req.user.institute,
      isActive: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

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
      const duplicateStudentEmail = await Student.findOne({
        _id: { $ne: req.params.id },
        institute: req.user.institute,
        email,
        isActive: true,
      });

      if (duplicateStudentEmail) {
        return res.status(409).json({
          success: false,
          message: "Student email already exists.",
        });
      }

      const existingUser = await User.findOne({
        _id: { $ne: student.user },
        email,
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Login email already exists.",
        });
      }
    }const updatedStudent = await Student.findOneAndUpdate(
  {
    _id: req.params.id,
    institute: req.user.institute,
    isActive: true,
  },
      {
        ...studentData,
        rollNumber,
        email,
        class: classId,
      },
      { new: true }
    ).populate("class", "name section department academicYear");

    if (student.user) {
      const userUpdateData = {
        fullName: studentData.fullName || updatedStudent.fullName,
        email: email || updatedStudent.email,
      };

      if (password) {
        userUpdateData.password = await bcrypt.hash(password, 10);
      }

      await User.findByIdAndUpdate(student.user, userUpdateData);
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
    isActive: true,
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

    if (deletedStudent.user) {
      await User.findByIdAndUpdate(deletedStudent.user, {
        isActive: false,
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

const getMyStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({
      user: req.user._id,
      institute: req.user.institute,
      isActive: true,
    })
      .populate("class", "name section department academicYear")
      .populate("user", "fullName email role");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const attendanceRecords = await Attendance.find({
      student: student._id,
    })
      .populate("subject", "name code")
      .populate("class", "name section")
      .sort({ date: -1 });

    const totalClasses = attendanceRecords.length;

    const presentCount = attendanceRecords.filter(
      (item) => item.status === "Present"
    ).length;

    const absentCount = attendanceRecords.filter(
      (item) => item.status === "Absent"
    ).length;

    const lateCount = attendanceRecords.filter(
      (item) => item.status === "Late"
    ).length;


const subjectMap = {};

attendanceRecords.forEach((record) => {
  const subjectId = record.subject?._id?.toString();

  if (!subjectId) return;

  if (!subjectMap[subjectId]) {
    subjectMap[subjectId] = {
      subjectName: record.subject?.name || "Unknown Subject",
      total: 0,
      present: 0,
      absent: 0,
      late: 0,
    };
  }

  subjectMap[subjectId].total += 1;

  if (record.status === "Present") subjectMap[subjectId].present += 1;
  if (record.status === "Absent") subjectMap[subjectId].absent += 1;
  if (record.status === "Late") subjectMap[subjectId].late += 1;
});

const subjectWiseAttendance = Object.values(subjectMap).map((item) => ({
  ...item,
  percentage:
    item.total > 0 ? Math.round((item.present / item.total) * 100) : 0,
}));
const monthlyMap = {};

attendanceRecords.forEach((record) => {
  const month = record.date?.slice(0, 7);

  if (!month) return;

  if (!monthlyMap[month]) {
    monthlyMap[month] = {
      month,
      total: 0,
      present: 0,
      absent: 0,
      late: 0,
    };
  }

  monthlyMap[month].total += 1;

  if (record.status === "Present") monthlyMap[month].present += 1;
  if (record.status === "Absent") monthlyMap[month].absent += 1;
  if (record.status === "Late") monthlyMap[month].late += 1;
});

const monthlyAttendance = Object.values(monthlyMap).map((item) => ({
  ...item,
  percentage:
    item.total > 0 ? Math.round((item.present / item.total) * 100) : 0,
}));


















    const attendancePercentage =
      totalClasses > 0
        ? Math.round((presentCount / totalClasses) * 100)
        : 0;

    res.status(200).json({
      success: true,
      data: {
        profile: student,
        summary: {
          totalClasses,
          presentCount,
          absentCount,
          lateCount,
          attendancePercentage,
        },
      subjectWiseAttendance,
monthlyAttendance,
attendanceHistory: attendanceRecords,
      },
    });
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
  getMyStudentDashboard,
};