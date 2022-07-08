const express = require("express");
const {
  getWorkout,
  getAllWorkouts,
  postWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

//create router instance
const router = express.Router();

//GET workouts
router.get("/", getAllWorkouts);

//GET a workout
router.get("/:id", getWorkout);

//POST a workout
router.post("/", postWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

//export
module.exports = router;
