const express = require("express");
const router = express.Router();

const { createClass } = require("../controllers/classController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createClass);

module.exports = router;