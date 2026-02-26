const Education = require("../models/Education");

const getEducation = async (req, res, next) => {
  try {
    const education = await Education.find({ visible: true }).sort({ endDate: -1 });

    res.status(200).json({
      success: true,
      count: education.length,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

const getEducationById = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      const error = new Error("Education not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
};

const createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      const error = new Error("Education not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
};

const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      const error = new Error("Education not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEducation, getEducationById, createEducation, updateEducation, deleteEducation };