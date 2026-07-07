const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const Department = require("../models/Department");
const Subject = require("../models/Subject");
const Attendance = require("../models/Attendance");

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalClasses = await Class.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalSubjects = await Subject.countDocuments();

    const attendance = await Attendance.find();

    const totalAttendance = attendance.length;
    const present = attendance.filter((a) => a.status === "Present").length;
    const absent = attendance.filter((a) => a.status === "Absent").length;
    const late = attendance.filter((a) => a.status === "Late").length;

    const attendancePercentage =
      totalAttendance > 0 ? Math.round((present / totalAttendance) * 100) : 0;

    res.status(200).json({
      success: true,
      analytics: {
        totalStudents,
        totalTeachers,
        totalClasses,
        totalDepartments,
        totalSubjects,
        totalAttendance,
        present,
        absent,
        late,
        attendancePercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Dashboard analytics error",
      error: error.message,
    });
  }
};

exports.getInstituteAnalytics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalClasses = await Class.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalSubjects = await Subject.countDocuments();
    const totalAttendance = await Attendance.countDocuments();

    res.status(200).json({
      success: true,
      instituteAnalytics: {
        totalStudents,
        totalTeachers,
        totalClasses,
        totalDepartments,
        totalSubjects,
        totalAttendance,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Institute analytics error",
      error: error.message,
    });
  }
};

exports.getDepartmentAnalytics = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

    const result = [];

    for (const dept of departments) {
      const teachers = await Teacher.countDocuments({
        department: dept._id,
      });

      const subjects = await Subject.countDocuments({
        department: dept._id,
      });

      result.push({
        departmentId: dept._id,
        departmentName: dept.name,
        teachers,
        subjects,
      });
    }

    res.status(200).json({
      success: true,
      departmentAnalytics: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Department analytics error",
      error: error.message,
    });
  }
};

exports.getClassAnalytics = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });

    const result = [];

    for (const cls of classes) {
      const students = await Student.countDocuments({
        class: cls._id,
      });

      const attendance = await Attendance.find({
        class: cls._id,
      });

      const totalAttendance = attendance.length;
      const present = attendance.filter((a) => a.status === "Present").length;

      const attendancePercentage =
        totalAttendance > 0
          ? Math.round((present / totalAttendance) * 100)
          : 0;

      result.push({
        classId: cls._id,
        className: cls.name || cls.className || "Unnamed Class",
        students,
        totalAttendance,
        attendancePercentage,
      });
    }

    res.status(200).json({
      success: true,
      classAnalytics: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Class analytics error",
      error: error.message,
    });
  }
};

exports.getSubjectAnalytics = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("department")
      .populate("teacher")
      .populate("class")
      .sort({ createdAt: -1 });

    const result = [];







    for (const subject of subjects) {
      const attendance = await Attendance.find({
        subject: subject._id,
      });

      const totalAttendance = attendance.length;
      const present = attendance.filter((a) => a.status === "Present").length;
      const absent = attendance.filter((a) => a.status === "Absent").length;
      const late = attendance.filter((a) => a.status === "Late").length;

      const attendancePercentage =
        totalAttendance > 0
          ? Math.round((present / totalAttendance) * 100)
          : 0;

      result.push({
        subjectId: subject._id,
        subjectName: subject.name,
        code: subject.code,
        department: subject.department?.name || "N/A",
        teacher:
          subject.teacher?.name ||
          subject.teacher?.fullName ||
          subject.teacher?.teacherName ||
          "Not Assigned",
        className: subject.class?.name || subject.class?.className || "N/A",
        totalAttendance,
        present,
        absent,
        late,
        attendancePercentage,
      });
    }

    res.status(200).json({
      success: true,
      subjectAnalytics: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subject analytics error",
      error: error.message,
    });
  }
};


exports.getWeeklyAttendanceAnalytics = async (req, res) => {
  try {
    const attendance = await Attendance.find();

    const weeklyData = {};

    attendance.forEach((item) => {
      const date = new Date(item.date);
      const week = `Week-${Math.ceil(date.getDate() / 7)}`;

      if (!weeklyData[week]) {
        weeklyData[week] = {
          week,
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
        };
      }

      weeklyData[week].total += 1;

      if (item.status === "Present") weeklyData[week].present += 1;
      if (item.status === "Absent") weeklyData[week].absent += 1;
      if (item.status === "Late") weeklyData[week].late += 1;
    });

    res.status(200).json({
      success: true,
      weeklyAttendance: Object.values(weeklyData),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Weekly attendance analytics error",
      error: error.message,
    });
  }
};

exports.getMonthlyAttendanceAnalytics = async (req, res) => {
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

    res.status(200).json({
      success: true,
      monthlyAttendance: Object.values(monthlyData),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Monthly attendance analytics error",
      error: error.message,
    });
  }
};

exports.getSubjectWiseAttendanceAnalytics = async (req, res) => {
  try {
    const subjects = await Subject.find();

    const result = [];

    for (const subject of subjects) {
      const attendance = await Attendance.find({ subject: subject._id });

      const total = attendance.length;
      const present = attendance.filter((a) => a.status === "Present").length;
      const absent = attendance.filter((a) => a.status === "Absent").length;
      const late = attendance.filter((a) => a.status === "Late").length;

      result.push({
        subjectName: subject.name,
        total,
        present,
        absent,
        late,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0,
      });
    }

    res.status(200).json({
      success: true,
      subjectWiseAttendance: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subject-wise attendance analytics error",
      error: error.message,
    });
  }
};

exports.getClassWiseAttendanceAnalytics = async (req, res) => {
  try {
    const classes = await Class.find();

    const result = [];

    for (const cls of classes) {
      const attendance = await Attendance.find({ class: cls._id });

      const total = attendance.length;
      const present = attendance.filter((a) => a.status === "Present").length;
      const absent = attendance.filter((a) => a.status === "Absent").length;
      const late = attendance.filter((a) => a.status === "Late").length;

      result.push({
        className: cls.name || cls.className,
        total,
        present,
        absent,
        late,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0,
      });
    }

    res.status(200).json({
      success: true,
      classWiseAttendance: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Class-wise attendance analytics error",
      error: error.message,
    });
  }
};