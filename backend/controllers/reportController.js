const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Attendance = require("../models/Attendance");

exports.getStudentReport = async (req, res) => {
  try {
    const { classId } = req.query;

    const filter = {};
    if (classId) filter.class = classId;

    const students = await Student.find(filter)
      .populate("class")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      students,
      totalStudents: students.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Student report fetch error",
      error: error.message,
    });
  }
};

exports.getTeacherReport = async (req, res) => {
  try {
    const { departmentId } = req.query;

    const filter = {};
    if (departmentId) filter.department = departmentId;

    const teachers = await Teacher.find(filter)
      .populate("department")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      teachers,
      totalTeachers: teachers.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Teacher report fetch error",
      error: error.message,
    });
  }
};

exports.getAttendanceReport = async (req, res) => {
  try {
    const { classId, subjectId, startDate, endDate } = req.query;

    const filter = {};

    if (classId) filter.class = classId;
    if (subjectId) filter.subject = subjectId;

    if (startDate && endDate) {
      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const attendance = await Attendance.find(filter)
      .populate("student")
      .populate("class")
      .populate("subject")
      .sort({ date: -1 });

    const total = attendance.length;
    const present = attendance.filter((item) => item.status === "Present").length;
    const absent = attendance.filter((item) => item.status === "Absent").length;
    const late = attendance.filter((item) => item.status === "Late").length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    res.status(200).json({
      success: true,
      attendance,
      summary: {
        total,
        present,
        absent,
        late,
        percentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance report fetch error",
      error: error.message,
    });
  }
};

exports.exportAttendanceExcel = async (req, res) => {
  try {
    const { classId, subjectId, startDate, endDate } = req.query;

    const filter = {};

    if (classId) filter.class = classId;
    if (subjectId) filter.subject = subjectId;

    if (startDate && endDate) {
      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const attendance = await Attendance.find(filter)
      .populate("student")
      .populate("class")
      .populate("subject")
      .sort({ date: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance Report");

    worksheet.columns = [
      { header: "Student", key: "student", width: 25 },
      { header: "Roll No", key: "rollNo", width: 15 },
      { header: "Class", key: "className", width: 25 },
      { header: "Subject", key: "subject", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    attendance.forEach((item) => {
      worksheet.addRow({
        student:
          item.student?.name ||
          item.student?.fullName ||
          item.student?.studentName ||
          "N/A",
        rollNo: item.student?.rollNo || item.student?.rollNumber || "N/A",
        className: item.class?.name || item.class?.className || "N/A",
        subject: item.subject?.name || "N/A",
        date: item.date,
        status: item.status,
      });
    });

    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attendance-report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Excel export error",
      error: error.message,
    });
  }
};

exports.exportAttendancePDF = async (req, res) => {
  try {
    const { classId, subjectId, startDate, endDate } = req.query;

    const filter = {};

    if (classId) filter.class = classId;
    if (subjectId) filter.subject = subjectId;

    if (startDate && endDate) {
      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const attendance = await Attendance.find(filter)
      .populate("student")
      .populate("class")
      .populate("subject")
      .sort({ date: -1 });

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attendance-report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(22).text("Upsthiti Attendance Report", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(12).text(`Total Records: ${attendance.length}`);
    doc.moveDown();

    attendance.forEach((item, index) => {
      doc
        .fontSize(11)
        .text(`${index + 1}. Student: ${
          item.student?.name ||
          item.student?.fullName ||
          item.student?.studentName ||
          "N/A"
        }`);

      doc.text(
        `   Roll No: ${item.student?.rollNo || item.student?.rollNumber || "N/A"}`
      );

      doc.text(
        `   Class: ${item.class?.name || item.class?.className || "N/A"}`
      );

      doc.text(`   Subject: ${item.subject?.name || "N/A"}`);
      doc.text(`   Date: ${item.date}`);
      doc.text(`   Status: ${item.status}`);

      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "PDF export error",
      error: error.message,
    });
  }
};


exports.exportStudentsExcel = async (req, res) => {
  try {
    const { classId } = req.query;

    const filter = {};
    if (classId) filter.class = classId;

    const students = await Student.find(filter)
      .populate("class")
      .sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Student Report");

    worksheet.columns = [
      { header: "Student Name", key: "name", width: 25 },
      { header: "Roll No", key: "rollNo", width: 15 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Class", key: "className", width: 25 },
    ];

    students.forEach((student) => {
      worksheet.addRow({
        name:
          student.name ||
          student.fullName ||
          student.studentName ||
          "N/A",
        rollNo: student.rollNo || student.rollNumber || "N/A",
        email: student.email || "N/A",
        phone: student.phone || "N/A",
        className: student.class?.name || student.class?.className || "N/A",
      });
    });

    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=student-report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Student Excel export error",
      error: error.message,
    });
  }
};

exports.exportTeachersExcel = async (req, res) => {
  try {
    const { departmentId } = req.query;

    const filter = {};
    if (departmentId) filter.department = departmentId;

    const teachers = await Teacher.find(filter)
      .populate("department")
      .sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Teacher Report");

    worksheet.columns = [
      { header: "Teacher Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Department", key: "department", width: 25 },
      { header: "Qualification", key: "qualification", width: 25 },
    ];

    teachers.forEach((teacher) => {
      worksheet.addRow({
        name:
          teacher.name ||
          teacher.fullName ||
          teacher.teacherName ||
          "N/A",
        email: teacher.email || "N/A",
        phone: teacher.phone || "N/A",
        department: teacher.department?.name || "N/A",
        qualification: teacher.qualification || "N/A",
      });
    });

    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=teacher-report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Teacher Excel export error",
      error: error.message,
    });
  }
};