const express = require("express");
const router = express.Router();

const {
  getDashboardAnalytics,
  getInstituteAnalytics,
  getDepartmentAnalytics,
  getClassAnalytics,
  getSubjectAnalytics,
  getWeeklyAttendanceAnalytics,
  getMonthlyAttendanceAnalytics,
  getSubjectWiseAttendanceAnalytics,
  getClassWiseAttendanceAnalytics,
} = require("../controllers/dashboardAnalyticsController");

const { protect } = require("../middleware/authMiddleware");
const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

router.use(
  protect,
  authorizeRoles("institute-admin")
);

router.get("/", getDashboardAnalytics);
router.get("/institute", getInstituteAnalytics);
router.get("/departments", getDepartmentAnalytics);
router.get("/classes", getClassAnalytics);
router.get("/subjects", getSubjectAnalytics);

router.get(
  "/attendance/weekly",
  getWeeklyAttendanceAnalytics
);

router.get(
  "/attendance/monthly",
  getMonthlyAttendanceAnalytics
);

router.get(
  "/attendance/subjects",
  getSubjectWiseAttendanceAnalytics
);

router.get(
  "/attendance/classes",
  getClassWiseAttendanceAnalytics
);

module.exports = router;