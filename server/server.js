console.log("File is being executed");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// --------------- Middleware ---------------
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// --------------- Routes ---------------
app.use("/api/health", require("./routes/health"));

// --------------- Centralized Error Handler ---------------
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  res.status(statusCode).json({ success: false, error: message });
});

// --------------- Start Server ---------------
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});