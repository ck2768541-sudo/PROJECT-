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
const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

router.use(
  protect,
  authorizeRoles("institute-admin")
);

router.post("/", createClass);
router.get("/", getClasses);
router.get("/count", getClassCount);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

module.exports = router;