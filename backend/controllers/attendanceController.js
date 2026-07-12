const Attendance = require("../models/Attendance");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
exports.markAttendance = async (req, res) => {
  try {
    const { records } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Attendance records are required",
      });
    }

    if (req.user.role === "student") {
      return res.status(403).json({
        success: false,
        message: "Students cannot mark attendance",
      });
    }

    let teacher = null;
    let allowedSubjectIds = [];
    let allowedClassIds = [];

    if (req.user.role === "teacher") {
      teacher = await Teacher.findOne({
        user: req.user._id,
        institute: req.user.institute,
        isActive: true,
      });

      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: "Teacher profile not found",
        });
      }

      const teacherSubjects = await Subject.find({
        teacher: teacher._id,
        status: "Active",
      }).select("_id class");

      allowedSubjectIds = teacherSubjects.map((subject) =>
        subject._id.toString()
      );

      allowedClassIds = teacherSubjects
        .filter((subject) => subject.class)
        .map((subject) => subject.class.toString());
    }

    for (const record of records) {
      if (
        !record.student ||
        !record.class ||
        !record.subject ||
        !record.date
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Student, class, subject and date are required for every record",
        });
      }

      if (
        !["Present", "Absent", "Late"].includes(record.status)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid attendance status",
        });
      }

      if (req.user.role === "teacher") {
        const subjectAllowed = allowedSubjectIds.includes(
          record.subject.toString()
        );

        const classAllowed = allowedClassIds.includes(
          record.class.toString()
        );

        if (!subjectAllowed || !classAllowed) {
          return res.status(403).json({
            success: false,
            message:
              "You can mark attendance only for your assigned class and subject",
          });
        }
      }

      const student = await Student.findOne({
        _id: record.student,
        class: record.class,
        institute: req.user.institute,
        isActive: true,
      });

      if (!student) {
        return res.status(400).json({
          success: false,
          message:
            "An active student was not found in the selected class",
        });
      }

      await Attendance.findOneAndUpdate(
        {
          student: record.student,
          class: record.class,
          subject: record.subject,
          date: record.date,
        },
        {
          student: record.student,
          class: record.class,
          subject: record.subject,
          date: record.date,
          status: record.status || "Present",
          remarks: record.remarks || "",
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance mark error",
      error: error.message,
    });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student")
      .populate("class")
      .populate("subject")
      .sort({ date: -1 });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance fetch error",
      error: error.message,
    });
  }
};

exports.getDailyAttendance = async (req, res) => {
  try {
    const { classId, subjectId, date } = req.query;

    const filter = {};
    if (classId) filter.class = classId;
    if (subjectId) filter.subject = subjectId;
    if (date) filter.date = date;

    const attendance = await Attendance.find(filter)
      .populate("student")
      .populate("class")
      .populate("subject")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Daily attendance fetch error",
      error: error.message,
    });
  }
};

exports.getMonthlyAttendance = async (req, res) => {
  try {
    const { month, year, classId, subjectId } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month and year are required",
      });
    }

    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month).padStart(2, "0")}-31`;

    const filter = {
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    if (classId) filter.class = classId;
    if (subjectId) filter.subject = subjectId;

    const attendance = await Attendance.find(filter)
      .populate("student")
      .populate("class")
      .populate("subject")
      .sort({ date: -1 });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Monthly attendance fetch error",
      error: error.message,
    });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance update error",
      error: error.message,
    });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance delete error",
      error: error.message,
    });
  }
};

exports.getStudentAttendanceReport = async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendance = await Attendance.find({ student: studentId })
      .populate("student")
      .populate("class")
      .populate("subject")
      .sort({ date: -1 });

    const total = attendance.length;
    const present = attendance.filter((a) => a.status === "Present").length;
    const absent = attendance.filter((a) => a.status === "Absent").length;
    const late = attendance.filter((a) => a.status === "Late").length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    res.status(200).json({
      success: true,
      attendance,
      summary: { total, present, absent, late, percentage },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Student attendance report error",
      error: error.message,
    });
  }
};

exports.getSubjectAttendanceReport = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const attendance = await Attendance.find({ subject: subjectId })
      .populate("student")
      .populate("class")
      .populate("subject")
      .sort({ date: -1 });

    const total = attendance.length;
    const present = attendance.filter((a) => a.status === "Present").length;
    const absent = attendance.filter((a) => a.status === "Absent").length;
    const late = attendance.filter((a) => a.status === "Late").length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    res.status(200).json({
      success: true,
      attendance,
      summary: { total, present, absent, late, percentage },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subject attendance report error",
      error: error.message,
    });
  }
};


exports.getTeacherAttendanceData = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      user: req.user._id,
      isActive: true,
    }).populate("assignedClasses");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const students = await Student.find({
      class: {
        $in: teacher.assignedClasses.map((cls) => cls._id),
      },
      isActive: true,
    }).populate("class");

    const subjects = await Subject.find({
      teacher: teacher._id,
      status: "Active",
    }).populate("class");

    res.status(200).json({
      success: true,
      classes: teacher.assignedClasses,
      subjects,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};