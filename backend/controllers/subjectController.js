const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
  try {
    const existingSubject = await Subject.findOne({
      code: req.body.code?.toUpperCase(),
    });

    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: "Subject code already exists",
      });
    }

    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subject create error",
      error: error.message,
    });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("department")
      .populate("teacher")
      .populate("class")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subject fetch error",
      error: error.message,
    });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate("department")
      .populate("teacher")
      .populate("class");

    res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subject details error",
      error: error.message,
    });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    if (req.body.code) {
      req.body.code = req.body.code.toUpperCase();

      const existingSubject = await Subject.findOne({
        code: req.body.code,
        _id: { $ne: req.params.id },
      });

      if (existingSubject) {
        return res.status(400).json({
          success: false,
          message: "Subject code already exists",
        });
      }
    }

    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subject update error",
      error: error.message,
    });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Subject delete error",
      error: error.message,
    });
  }
};