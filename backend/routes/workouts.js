const express = require("express");
const Workout = require("../models/workoutModel");

//create router instance
const router = express.Router();

//GET workouts
router.get("/", (req, res) => {
  res.json({ mssg: "GET all workouts" });
});

//GET a workout
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single workout" });
});

//POST a workout
router.post("/", async (req, res) => {
  const { exercise, reps, weight } = req.body;

  try {
    const workout = await Workout.create({ exercise, reps, weight }); //use workout model to create new document
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a workout" });
});

//UPDATE a workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a workout" });
});

//export
module.exports = router;
