const express = require("express");
const router = express.Router();

const {
  registerInstitute,
  getMyInstitute,
} = require("../controllers/instituteController");

const { protect } = require("../middleware/authMiddleware");

// Single Institute routes
router.post("/register", registerInstitute);
router.get("/my-institute", protect, getMyInstitute);

module.exports = router;