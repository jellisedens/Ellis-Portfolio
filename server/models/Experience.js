const mongoose = require("mongoose");

/*
  Experience entries represent professional roles.
  
  highlights is an array of strings — individual accomplishments
  like "Built a REST API serving 10k daily requests." These
  render as bullet points on the frontend, similar to a resume.

  endDate is optional. If null, the frontend displays "Present"
  which signals this is your current role.
*/

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    highlights: [
      {
        type: String,
        maxlength: [200, "Highlight cannot exceed 200 characters"],
      },
    ],
    technologies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", experienceSchema);