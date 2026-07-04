const Class = require("../models/Class");

const createClass = async (req, res) => {
  try {
    const { name, section, department, academicYear } = req.body;

    if (!req.user || !req.user.institute) {
      return res.status(400).json({
        success: false,
        message: "Institute not found for this user.",
      });
    }

    const newClass = await Class.create({
      institute: req.user.institute,
      name,
      section,
      department,
      academicYear,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({
      institute: req.user.institute,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
      },
      req.body,
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
      },
      { isActive: false },
      { new: true }
    );

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getClassCount = async (req, res) => {
  try {
    const count = await Class.countDocuments({
      institute: req.user.institute,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
  getClassCount,
};