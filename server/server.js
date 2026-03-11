const express = require("express");
const cors = require("cors");
const config = require("./config");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const cacheControl = require("./middleware/cacheControl");

const app = express();

// --- 1. Body Parser ---
app.use(express.json());

// --- 2. CORS ---
app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [config.clientUrl, config.adminUrl].filter(Boolean);
      if (
        !origin ||
        allowed.some((url) => origin.startsWith(url)) ||
        origin.includes("vercel.app") ||
        origin.includes("edenssolutions.net")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// --- 3. Cache Control ---
// Browser caches GET responses for 5 minutes (300s).
// POST/PUT/DELETE are unaffected — only reads are cached.
app.use("/api", cacheControl(300));

// --- 4. Routes ---
app.use("/api", require("./routes"));

// --- 5. 404 Handler ---
app.use(notFound);

// --- 6. Error Handler ---
app.use(errorHandler);

// --- Connect to DB, then start server ---
const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
  });
};

startServer();