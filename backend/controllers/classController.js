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

    if (!name || !section || !department || !academicYear) {
      return res.status(400).json({
        success: false,
        message:
          "Class name, section, department and academic year are required.",
      });
    }

    const duplicateClass = await Class.findOne({
      institute: req.user.institute,
      name: name.trim(),
      section: section.trim(),
      department,
      academicYear: academicYear.trim(),
      isActive: true,
    });

    if (duplicateClass) {
      return res.status(409).json({
        success: false,
        message:
          "This class already exists with the same section, department and academic year.",
      });
    }

    const newClass = await Class.create({
      institute: req.user.institute,
      name: name.trim(),
      section: section.trim(),
      department,
      academicYear: academicYear.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const { name, section, department, academicYear } = req.body;

    const currentClass = await Class.findOne({
      _id: req.params.id,
      institute: req.user.institute,
      isActive: true,
    });

    if (!currentClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const finalName = name?.trim() || currentClass.name;
    const finalSection = section?.trim() || currentClass.section;
    const finalDepartment = department || currentClass.department;
    const finalAcademicYear =
      academicYear?.trim() || currentClass.academicYear;

    const duplicateClass = await Class.findOne({
      _id: { $ne: req.params.id },
      institute: req.user.institute,
      name: finalName,
      section: finalSection,
      department: finalDepartment,
      academicYear: finalAcademicYear,
      isActive: true,
    });

    if (duplicateClass) {
      return res.status(409).json({
        success: false,
        message:
          "This class already exists with the same section, department and academic year.",
      });
    }

    const updatedClass = await Class.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
        isActive: true,
      },
      {
        ...req.body,
        name: finalName,
        section: finalSection,
        department: finalDepartment,
        academicYear: finalAcademicYear,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findOneAndUpdate(
      {
        _id: req.params.id,
        institute: req.user.institute,
        isActive: true,
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
  getClassCount,
};