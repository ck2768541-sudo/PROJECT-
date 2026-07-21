const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getDepartments,
  getDepartmentCount,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const { protect } = require("../middleware/authMiddleware");
const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

router.use(
  protect,
  authorizeRoles("institute-admin")
);

router.get("/count", getDepartmentCount);
router.post("/", createDepartment);
router.get("/", getDepartments);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

module.exports = router;