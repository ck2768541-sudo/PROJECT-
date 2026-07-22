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

router.get("/attendance", getAttendanceAnalytics);
router.get("/students", getStudentAnalytics);
router.get("/teachers", getTeacherAnalytics);

router.get("/monthly-summary", getMonthlySummary);
router.get("/department-summary", getDepartmentSummary);
router.get("/class-summary", getClassSummary);

module.exports = router;