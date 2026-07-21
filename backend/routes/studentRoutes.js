const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentCount,
  getMyStudentDashboard,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");
const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

// Student apna dashboard dekh sakta hai
router.get(
  "/me/dashboard",
  protect,
  authorizeRoles("student"),
  getMyStudentDashboard
);

// Baaki Student management sirf Admin
router.post(
  "/",
  protect,
  authorizeRoles("institute-admin"),
  createStudent
);

router.get(
  "/",
  protect,
  authorizeRoles("institute-admin"),
  getStudents
);

router.get(
  "/count",
  protect,
  authorizeRoles("institute-admin"),
  getStudentCount
);

router.get(
  "/:id",
  protect,
  authorizeRoles("institute-admin"),
  getStudentById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("institute-admin"),
  updateStudent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("institute-admin"),
  deleteStudent
);

module.exports = router;