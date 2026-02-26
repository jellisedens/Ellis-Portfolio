// Database connection — ready for MongoDB phase.
// Uncomment when we install Mongoose and set up MongoDB Atlas.

// const mongoose = require("mongoose");
// const config = require("./index");
//
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(config.mongoUri);
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`MongoDB connection error: ${error.message}`);
//     process.exit(1);
//   }
// };
//
// module.exports = connectDB;