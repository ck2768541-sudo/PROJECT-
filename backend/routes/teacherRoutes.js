const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherCount,
  getMyTeacherDashboard,
} = require("../controllers/teacherController");

const { protect } = require("../middleware/authMiddleware");
const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

// Teacher apna dashboard dekh sakta hai
router.get(
  "/me/dashboard",
  protect,
  authorizeRoles("teacher"),
  getMyTeacherDashboard
);

// Baaki Teacher management sirf Admin
router.post(
  "/",
  protect,
  authorizeRoles("institute-admin"),
  createTeacher
);

router.get(
  "/",
  protect,
  authorizeRoles("institute-admin"),
  getTeachers
);

router.get(
  "/count",
  protect,
  authorizeRoles("institute-admin"),
  getTeacherCount
);

router.get(
  "/:id",
  protect,
  authorizeRoles("institute-admin"),
  getTeacherById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("institute-admin"),
  updateTeacher
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("institute-admin"),
  deleteTeacher
);

module.exports = router;