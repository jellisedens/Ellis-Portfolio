const express = require("express");
const router = express.Router();
const { getEducation, getEducationById, createEducation, updateEducation, deleteEducation } = require("../controllers/educationController");

router.get("/", getEducation);
router.get("/:id", getEducationById);
router.post("/", createEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

module.exports = router;