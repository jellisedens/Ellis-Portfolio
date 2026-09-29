const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { getExperiences, getExperienceById, createExperience, updateExperience, deleteExperience } = require("../controllers/experienceController");

router.get("/", getExperiences);
router.get("/:id", getExperienceById);
router.post("/", protect, createExperience);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);

module.exports = router;