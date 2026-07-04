const express = require("express");
const {
  registerInstitute,
  getMyInstitute,
} = require("../controllers/instituteController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerInstitute);
router.get("/me", protect, getMyInstitute);

module.exports = router;