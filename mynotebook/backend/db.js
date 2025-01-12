const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/myNotebook";

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    // Your code here
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}


module.exports = connectToMongo; // Export the function if needed elsewhere
