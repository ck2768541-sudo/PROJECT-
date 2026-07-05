const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },

    semester: {
      type: String,
      required: true,
    },

    subjectType: {
      type: String,
      enum: ["Theory", "Practical", "Lab"],
      default: "Theory",
    },

    credits: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);