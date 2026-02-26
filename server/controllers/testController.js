const getTest = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "GET /api/test is working",
    });
  } catch (error) {
    next(error);
  }
};

const postTest = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      const error = new Error("Name is required");
      error.statusCode = 400;
      throw error;
    }

    res.status(201).json({
      success: true,
      message: `Received: ${name}`,
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTest, postTest };