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
const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

router.use(
  protect,
  authorizeRoles("institute-admin")
);

router.get("/students", getStudentReport);
router.get("/teachers", getTeacherReport);
router.get("/attendance", getAttendanceReport);

router.get(
  "/attendance/export/excel",
  exportAttendanceExcel
);

router.get(
  "/attendance/export/pdf",
  exportAttendancePDF
);

router.get(
  "/students/export/excel",
  exportStudentsExcel
);

router.get(
  "/teachers/export/excel",
  exportTeachersExcel
);

module.exports = router;