const mongoose = require("mongoose");

/*
  Education supports multiple credential types through the
  type enum. This lets you mix degrees, bootcamps, and
  certifications in one collection and filter by type
  on the frontend if needed.

  endDate is optional — null means currently enrolled.
*/

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
      maxlength: [100, "Institution name cannot exceed 100 characters"],
    },
    degree: {
      type: String,
      required: [true, "Degree or credential is required"],
      trim: true,
      maxlength: [100, "Degree cannot exceed 100 characters"],
    },
    fieldOfStudy: {
      type: String,
      trim: true,
      maxlength: [100, "Field of study cannot exceed 100 characters"],
    },
    type: {
      type: String,
      required: [true, "Education type is required"],
      enum: {
        values: ["Degree", "Bootcamp", "Certification", "Course"],
        message: "{VALUE} is not a valid education type",
      },
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
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Education", educationSchema);