const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { getEducation, getEducationById, createEducation, updateEducation, deleteEducation } = require("../controllers/educationController");

router.get("/", getEducation);
router.get("/:id", getEducationById);
router.post("/", protect, createEducation);
router.put("/:id", protect, updateEducation);
router.delete("/:id", protect, deleteEducation);

module.exports = router;