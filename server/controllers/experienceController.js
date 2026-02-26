const Experience = require("../models/Experience");

const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({ visible: true })
      .populate("technologies", "name category")
      .sort({ endDate: -1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

const getExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate("technologies", "name category");

    if (!experience) {
      const error = new Error("Experience not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      const error = new Error("Experience not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      const error = new Error("Experience not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = { getExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };