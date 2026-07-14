const express = require("express");
const router = express.Router();

const { getMyInstitute } = require("../controllers/instituteController");
const { protect } = require("../middleware/authMiddleware");

// केवल logged-in user अपने institute की details देख सकता है
router.get("/my-institute", protect, getMyInstitute);

module.exports = router;