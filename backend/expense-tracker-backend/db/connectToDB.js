const mongoose = require("mongoose");

const url = process.env.MONGO_DB_CONNECTION_STRING;
async function connectToDatabase() {
  if (!url) {
    console.log("Error!, no monogdb connection string");
  }
  try {
    await mongoose.connect(url);
    console.log("connection to database was successful");
  } catch (error) {
    console.log("failed to connect to database -> ", error.message);
  }
}

module.exports = connectToDatabase;
