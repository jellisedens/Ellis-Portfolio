const Skill = require("../models/Skill");

const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ visible: true }).sort({ category: 1, name: 1 });

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
    const skill = await Skill.findById(req.params.id);

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