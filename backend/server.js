const express = require("express"); // Import express - backend framework

// Express.js middleware
const cors = require("cors"); // Allows for servers to access outside (?)
const nodemon = require("nodemon");
require("dotenv").config();
const mongoose = require("mongoose");

// Import files
const userRoute = require("./routes/user");
const exerciseRoute = require("./routes/exercise");

// Initialize express app
const app = express();
const port = process.env.PORT || 5000; // set port as the process'es port if exists, else 5000

// Use middlewares
app.use(cors());
app.use(express.json()); // Middleware to allow express to parse JSON

// Get MongoDB URI Key
const uri = process.env.ATLAS_URI;

// Connect to MongoDB
try {
  // Mongoose.connect() is an async function - returns a Promise
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create connection - similar to MySQL
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully!");
  });
} catch (error) {
  console.log(error);
}

// Routes for querying MongoDB - users & exercises
app.use("/exercise", exerciseRoute);
app.use("/user", userRoute);

// Start server = `nodemon server`
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
