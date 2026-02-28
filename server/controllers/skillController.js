const Skill = require("../models/Skill");

const getSkills = async (req, res, next) => {
  try {
    const { category, sort, order } = req.query;

    const filter = { visible: true };

    if (category) {
      const Category = require("../models/Category");
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        filter.category = cat._id;
      }
    }

    const sortField = sort || "name";
    const sortOrder = order === "desc" ? -1 : 1;
    const sortOptions = { [sortField]: sortOrder };

    const skills = await Skill.find(filter)
      .populate("category", "name slug color icon")
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

const getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id)
      .populate("category", "name slug color icon");

    if (!skill) {
      const error = new Error("Skill not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      const error = new Error("Skill not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      const error = new Error("Skill not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSkills, getSkillById, createSkill, updateSkill, deleteSkill };