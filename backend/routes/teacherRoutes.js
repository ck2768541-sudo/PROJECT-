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

router.post("/", protect, createTeacher);
router.get("/", protect, getTeachers);
router.get("/count", protect, getTeacherCount);
router.get("/me/dashboard", protect, getMyTeacherDashboard);
router.get("/:id", protect, getTeacherById);
router.put("/:id", protect, updateTeacher);
router.delete("/:id", protect, deleteTeacher);

module.exports = router;