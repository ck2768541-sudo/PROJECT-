const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createStudent);
router.get("/", protect, getStudents);

module.exports = router;