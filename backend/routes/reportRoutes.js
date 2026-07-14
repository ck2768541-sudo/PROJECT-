const express = require("express");
const router = express.Router();

const {
  getStudentReport,
  getTeacherReport,
  getAttendanceReport,
  exportAttendanceExcel,
  exportAttendancePDF,
  exportStudentsExcel,
  exportTeachersExcel,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

router.get("/students", protect, getStudentReport);
router.get("/teachers", protect, getTeacherReport);
router.get("/attendance", protect, getAttendanceReport);

router.get("/attendance/export/excel", protect, exportAttendanceExcel);
router.get("/attendance/export/pdf", protect, exportAttendancePDF);

router.get("/students/export/excel", protect, exportStudentsExcel);
router.get("/teachers/export/excel", protect, exportTeachersExcel);

module.exports = router;