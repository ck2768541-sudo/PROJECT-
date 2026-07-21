const express = require("express");
const router = express.Router();

const {
  getAttendanceAnalytics,
  getStudentAnalytics,
  getTeacherAnalytics,
  getMonthlySummary,
  getDepartmentSummary,
  getClassSummary,
} = require("../controllers/reportAnalyticsController");

const { protect } = require("../middleware/authMiddleware");
const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

router.use(
  protect,
  authorizeRoles("institute-admin")
);

router.get("/attendance", getAttendanceAnalytics);
router.get("/students", getStudentAnalytics);
router.get("/teachers", getTeacherAnalytics);
router.get("/monthly-summary", getMonthlySummary);
router.get("/department-summary", getDepartmentSummary);
router.get("/class-summary", getClassSummary);

module.exports = router;