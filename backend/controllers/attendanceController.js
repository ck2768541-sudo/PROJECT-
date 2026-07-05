const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { records } = req.body;

    if (!records || records.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Attendance records are required",
      });
    }

    for (const record of records) {
      await Attendance.findOneAndUpdate(
        {
          student: record.student,
          class: record.class,
          subject: record.subject,
          date: record.date,
        },
        record,
        { upsert: true, new: true }
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