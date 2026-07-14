const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  try {
    const { name, code, hod, description } = req.body;

    if (!req.user || !req.user.institute) {
      return res.status(400).json({
        success: false,
        message: "Institute not found",
      });
    }

    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "Name and Code are required",
      });
    }

    const existing = await Department.findOne({
      institute: req.user.institute,
      code,
      isActive: true,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Department code already exists",
      });
    }

    const department = await Department.create({
      institute: req.user.institute,
      name,
      code,
      hod,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({
      institute: req.user.institute,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;

   const department = await Department.findOne({
  _id: id,
  institute: req.user.institute,
  isActive: true,
});

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

   const updatedDepartment = await Department.findOneAndUpdate(
  {
    _id: id,
    institute: req.user.institute,
    isActive: true,
  },
  req.body,
  {
    new: true,
    runValidators: true,
  }
);

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: updatedDepartment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

const department = await Department.findOneAndUpdate(
  {
    _id: id,
    institute: req.user.institute,
    isActive: true,
  },
  {
    isActive: false,
  },
  {
    new: true,
  }
);

if (!department) {
  return res.status(404).json({
    success: false,
    message: "Department not found",
  });
}

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getDepartmentCount = async (req, res) => {
  try {
    const count = await Department.countDocuments({
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
  createDepartment,
  getDepartments,
  getDepartmentCount,
  updateDepartment,
  deleteDepartment,
};





