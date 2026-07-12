const Teacher = require("../models/Teacher");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Subject = require("../models/Subject");
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
      password,
    } = req.body;

    if (!req.user || !req.user.institute) {
      return res.status(400).json({
        success: false,
        message: "Institute not found for this user.",
      });
    }

    if (!fullName || !gender || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, gender and password are required.",
      });
    }

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
      role: "teacher",
      institute: req.user.institute,
    });

    const teacher = await Teacher.create({
      institute: req.user.institute,
      user: user._id,
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
      message: "Teacher created successfully with login account",
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
      .populate("user", "fullName email role isActive")
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
    })
      .populate("assignedClasses", "name section department academicYear")
      .populate("user", "fullName email role isActive");

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
    const { email, password, ...teacherData } = req.body;

    const oldTeacher = await Teacher.findOne({
      _id: req.params.id,
      institute: req.user.institute,
      isActive: true,
    });

    if (!oldTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

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

      const existingUser = await User.findOne({
        _id: { $ne: oldTeacher.user },
        email,
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Login email already exists.",
        });
      }
    }

    const teacher = await Teacher.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
      },
      {
        ...teacherData,
        email,
      },
      { new: true }
    ).populate("assignedClasses", "name section department academicYear");

    if (oldTeacher.user) {
      const userUpdateData = {
        fullName: teacher.fullName,
        email: teacher.email,
      };

      if (password) {
        userUpdateData.password = await bcrypt.hash(password, 10);
      }

      await User.findByIdAndUpdate(oldTeacher.user, userUpdateData);
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

    if (teacher.user) {
      await User.findByIdAndUpdate(teacher.user, {
        isActive: false,
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

const getMyTeacherDashboard = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      user: req.user._id,
      institute: req.user.institute,
      isActive: true,
    }).populate(
      "assignedClasses",
      "name section department academicYear"
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher profile not found",
      });
    }

    const assignedSubjects = await Subject.find({
      teacher: teacher._id,
      status: "Active",
    })
      .populate("class", "name section academicYear")
      .populate("department", "name")
      .sort({ name: 1 });

    const subjectIds = assignedSubjects.map((subject) => subject._id);

    const attendanceRecords = await Attendance.find({
      subject: { $in: subjectIds },
    })
      .populate("student", "fullName rollNumber")
      .populate("subject", "name code")
      .populate("class", "name section")
      .sort({ date: -1, createdAt: -1 })
      .limit(10);

    const totalAttendanceRecords = await Attendance.countDocuments({
      subject: { $in: subjectIds },
    });
    const attendanceSummary = await Attendance.aggregate([
  {
    $match: {
      subject: { $in: subjectIds },
    },
  },
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 },
    },
  },
]);

let presentCount = 0;
let absentCount = 0;
let lateCount = 0;

attendanceSummary.forEach((item) => {
  if (item._id === "Present") presentCount = item.count;
  if (item._id === "Absent") absentCount = item.count;
  if (item._id === "Late") lateCount = item.count;
});

    res.status(200).json({
      success: true,
      data: {
        profile: teacher,
summary: {
  totalClasses: teacher.assignedClasses.length,
  totalSubjects: assignedSubjects.length,
  totalAttendanceRecords,
  presentCount,
  absentCount,
  lateCount,
},

        assignedSubjects,
        recentAttendance: attendanceRecords,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherCount,
  getMyTeacherDashboard,
};