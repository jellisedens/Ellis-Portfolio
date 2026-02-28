const jwt = require("jsonwebtoken");
const config = require("../config");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check for Bearer token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("Not authorized to access this route");
      error.statusCode = 401;
      throw error;
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach admin to request
    req.admin = await Admin.findById(decoded.id);

    if (!req.admin) {
      const error = new Error("Admin not found");
      error.statusCode = 401;
      throw error;
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      error.message = "Not authorized to access this route";
      error.statusCode = 401;
    }
    next(error);
  }
};

module.exports = protect;