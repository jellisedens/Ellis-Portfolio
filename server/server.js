const config = require("./config");
const connectDB = require("./config/db");
const app = require("./app");

// --- Connect to DB, then start server ---
const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
  });
};

startServer();
