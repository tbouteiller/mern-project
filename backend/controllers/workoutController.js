const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

// @desc    Get all workouts
// @route   GET /api/workouts
// @access  Private
const getAllWorkouts = async (req, res) => {
  const retrievedWorkouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(retrievedWorkouts);
};

// @desc    Get a single workout
// @route   GET /api/workouts/:id
// @access  Private
const getWorkout = async (req, res) => {
  const { id } = req.params;

  validIdCheck(id, res);
  const retrievedWorkout = await Workout.findById(id);
  returnStatus(retrievedWorkout, res);
};

// @desc    Post a workout
// @route   POST /api/workouts
// @access  Private
const postWorkout = async (req, res) => {
  try {
    const body = req.body;
    const obj = new Workout(body);
    const postedWorkout = await Workout.create(obj);
    res.status(200).json(postedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  validIdCheck(id, res);
  const updatedWorkout = await Workout.findByIdAndUpdate(id, body);
  returnStatus(updatedWorkout, res);
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  validIdCheck(id, res);
  const deletedWorkout = await Workout.findByIdAndDelete(id);
  returnStatus(deletedWorkout, res);
};

//helper functions
const validIdCheck = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid object id." });
  }
};

const returnStatus = (workout, res) => {
  return workout
    ? res.status(200).json(workout)
    : res.status(404).json({ error: "Workout not found." });
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  postWorkout,
  updateWorkout,
  deleteWorkout,
};
