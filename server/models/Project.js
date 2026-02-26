const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    summary: {
      type: String,
      required: [true, "Project summary is required"],
      maxlength: [200, "Summary cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    technologies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      enum: {
        values: ["Full-Stack", "Frontend", "Backend", "Mobile"],
        message: "{VALUE} is not a valid project type",
      },
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "Completed",
      enum: ["Completed", "In Progress"],
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

module.exports = mongoose.model("Project", projectSchema);