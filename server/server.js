const express = require("express");
const cors = require("cors");
const config = require("./config");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();

// --- 1. Body Parser ---
app.use(express.json());

// --- 2. CORS ---
app.use(
  cors({
    origin: [config.clientUrl, config.adminUrl],
  })
);

// --- 3. Routes ---
app.use("/api", require("./routes"));

// --- 4. 404 Handler ---
app.use(notFound);

// --- 5. Error Handler ---
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