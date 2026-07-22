const express = require("express");
const router = express.Router();

const {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
  getClassCount,
} = require("../controllers/classController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createClass);
router.get("/", protect, getClasses);
router.get("/count", protect, getClassCount);
router.put("/:id", protect, updateClass);
router.delete("/:id", protect, deleteClass);

module.exports = router;