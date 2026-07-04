const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentCount,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createStudent);
router.get("/", protect, getStudents);
router.get("/count", protect, getStudentCount);
router.get("/:id", protect, getStudentById);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;