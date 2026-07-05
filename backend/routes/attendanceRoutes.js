const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getDailyAttendance,
  getMonthlyAttendance,
  updateAttendance,
  deleteAttendance,
  getStudentAttendanceReport,
  getSubjectAttendanceReport,
} = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.get("/", getAttendance);

router.get("/daily", getDailyAttendance);
router.get("/monthly", getMonthlyAttendance);

router.get("/student/:studentId", getStudentAttendanceReport);
router.get("/subject/:subjectId", getSubjectAttendanceReport);

router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;