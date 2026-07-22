const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  markAttendance,
  getAttendance,
  getDailyAttendance,
  getMonthlyAttendance,
  updateAttendance,
  deleteAttendance,
  getStudentAttendanceReport,
  getSubjectAttendanceReport,
  getTeacherAttendanceData,
} = require("../controllers/attendanceController");
router.get("/teacher/data", protect, getTeacherAttendanceData);
router.post("/", protect, markAttendance);

router.get("/", protect, getAttendance);

router.get("/daily", protect, getDailyAttendance);

router.get("/monthly", protect, getMonthlyAttendance);

router.get(
  "/student/:studentId",
  protect,
  getStudentAttendanceReport
);

router.get(
  "/subject/:subjectId",
  protect,
  getSubjectAttendanceReport
);

router.put("/:id", protect, updateAttendance);

router.delete("/:id", protect, deleteAttendance);


module.exports = router;