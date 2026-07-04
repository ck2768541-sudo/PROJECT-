const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getTeachers,
  getTeacherCount,
} = require("../controllers/teacherController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTeacher);
router.get("/", protect, getTeachers);
router.get("/count", protect, getTeacherCount);

module.exports = router;