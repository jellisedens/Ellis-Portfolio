const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", protect, createCategory);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;