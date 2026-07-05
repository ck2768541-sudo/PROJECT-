const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Attendance = require("../models/Attendance");
const Class = require("../models/Class");
const Department = require("../models/Department");

exports.getAttendanceAnalytics = async (req, res) => {
  try {
    const attendance = await Attendance.find();

    const total = attendance.length;
    const present = attendance.filter((a) => a.status === "Present").length;
    const absent = attendance.filter((a) => a.status === "Absent").length;
    const late = attendance.filter((a) => a.status === "Late").length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    res.status(200).json({
      success: true,
      analytics: { total, present, absent, late, percentage },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance analytics error",
      error: error.message,
    });
  }
};

exports.getStudentAnalytics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    res.status(200).json({
      success: true,
      analytics: { totalStudents },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Student analytics error",
      error: error.message,
    });
  }
};

exports.getTeacherAnalytics = async (req, res) => {
  try {
    const totalTeachers = await Teacher.countDocuments();

    res.status(200).json({
      success: true,
      analytics: { totalTeachers },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Teacher analytics error",
      error: error.message,
    });
  }
};

exports.getMonthlySummary = async (req, res) => {
  try {
    const attendance = await Attendance.find();

    const monthlyData = {};

    attendance.forEach((item) => {
      const month = item.date?.slice(0, 7) || "Unknown";

      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
        };
      }

      monthlyData[month].total += 1;

      if (item.status === "Present") monthlyData[month].present += 1;
      if (item.status === "Absent") monthlyData[month].absent += 1;
      if (item.status === "Late") monthlyData[month].late += 1;
    });

    const result = Object.values(monthlyData).map((item) => ({
      ...item,
      percentage:
        item.total > 0 ? Math.round((item.present / item.total) * 100) : 0,
    }));

    res.status(200).json({
      success: true,
      monthlySummary: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Monthly summary error",
      error: error.message,
    });
  }
};

exports.getDepartmentSummary = async (req, res) => {
  try {
    const departments = await Department.find();

    const result = [];

    for (const dept of departments) {
      const students = await Student.countDocuments({
        department: dept._id,
      });

      const teachers = await Teacher.countDocuments({
        department: dept._id,
      });

      result.push({
        departmentId: dept._id,
        departmentName: dept.name,
        students,
        teachers,
      });
    }

    res.status(200).json({
      success: true,
      departmentSummary: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Department summary error",
      error: error.message,
    });
  }
};

exports.getClassSummary = async (req, res) => {
  try {
    const classes = await Class.find();

    const result = [];

    for (const cls of classes) {
      const students = await Student.countDocuments({
        class: cls._id,
      });

      const attendance = await Attendance.find({
        class: cls._id,
      });

      const total = attendance.length;
      const present = attendance.filter((a) => a.status === "Present").length;
      const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

      result.push({
        classId: cls._id,
        className: cls.name || cls.className,
        students,
        totalAttendance: total,
        attendancePercentage: percentage,
      });
    }

    res.status(200).json({
      success: true,
      classSummary: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Class summary error",
      error: error.message,
    });
  }
};