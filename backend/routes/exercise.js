// Import mongoose.router
const express = require("express");
const router = express.Router();

// Import Exercise MongoDB model
const Exercise = require("../models/exercise.model");

const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(400).json("Error " + err);
  }
};

const addExercise = async (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date(req.body.date);

  let exercise = new Exercise({ username, description, duration, date });

  try {
    await exercise.save();
    res.json(`Successfully added ${username}`);
  } catch (err) {
    res.status(400).json("Error " + err);
  }
};

// Handle a HTTP GET request at localhost:5000/exercise/
router.route("/").get((req, res) => {
  getExercises(req, res);
});

// Handle a HTTP POST request at localhost:5000/exericse/add
router.route("/add").post((req, res) => {
  addExercise(req, res);
});

module.exports = router;
