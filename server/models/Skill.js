const mongoose = require("mongoose");

/*
  Skills are referenced by both Projects and Experience,
  making this the foundation model. Create skills first,
  then reference them when adding projects and jobs.

  The category enum lets you group skills on the frontend
  (e.g. show Frontend skills in one column, Backend in another).
*/

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Skill name cannot exceed 50 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Frontend", "Backend", "Database", "Tools", "Other"],
        message: "{VALUE} is not a valid category",
      },
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

module.exports = mongoose.model("Skill", skillSchema);