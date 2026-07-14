const Institute = require("../models/Institute");

const getMyInstitute = async (req, res) => {
  try {
    if (!req.user || !req.user.institute) {
      return res.status(400).json({
        success: false,
        message: "Institute not assigned to this user",
      });
    }

    const institute = await Institute.findById(req.user.institute);

    if (!institute) {
      return res.status(404).json({
        success: false,
        message: "Institute not found",
      });
    }

    res.status(200).json({
      success: true,
      institute,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Institute fetch error",
      error: error.message,
    });
  }
};

module.exports = {
  getMyInstitute,
};