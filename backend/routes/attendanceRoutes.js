const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

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

// Teacher ka assigned class/subject data
router.get(
  "/teacher/data",
  protect,
  authorizeRoles("teacher"),
  getTeacherAttendanceData
);

// Admin aur Teacher attendance mark kar sakte hain.
// Controller ke andar Teacher assignment validation bhi rahegi.
router.post(
  "/",
  protect,
  authorizeRoles("institute-admin", "teacher"),
  markAttendance
);

// Neeche ke full attendance management routes sirf Admin
router.get(
  "/",
  protect,
  authorizeRoles("institute-admin"),
  getAttendance
);

router.get(
  "/daily",
  protect,
  authorizeRoles("institute-admin"),
  getDailyAttendance
);

router.get(
  "/monthly",
  protect,
  authorizeRoles("institute-admin"),
  getMonthlyAttendance
);

router.get(
  "/student/:studentId",
  protect,
  authorizeRoles("institute-admin"),
  getStudentAttendanceReport
);

router.get(
  "/subject/:subjectId",
  protect,
  authorizeRoles("institute-admin"),
  getSubjectAttendanceReport
);

router.put(
  "/:id",
  protect,
  authorizeRoles("institute-admin"),
  updateAttendance
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("institute-admin"),
  deleteAttendance
);

module.exports = router;