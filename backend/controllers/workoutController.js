const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");
const User = require("../models/userModel");

// @desc    Get all workouts
// @route   GET /api/workouts
// @access  Private
const getAllWorkouts = async (req, res) => {
  const retrievedWorkouts = await Workout.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json(retrievedWorkouts);
};

// @desc    Get a single workout
// @route   GET /api/workouts/:id
// @access  Private
const getWorkout = async (req, res) => {
  const { id } = req.params;

  validIdCheck(id, res);

  const retrievedWorkout = await Workout.findOne({
    _id: id,
    user: req.user.id,
  });

  returnStatus(retrievedWorkout, res);
};

// @desc    Post a workout
// @route   POST /api/workouts
// @access  Private
const postWorkout = async (req, res) => {
  try {
    const body = { user: req.user.id, ...req.body };
    const postedWorkout = await Workout.create(new Workout(body));
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

  //find and verify workout
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "Workout not found." });
  }

  //find and verify user
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(400).json({ error: "User not found." });
  }

  //check if the logged in user matches the user attached to the specific workout
  if (user.id !== workout.user.toString()) {
    return res.status(401).json({ error: "User not authorized." });
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(id, body);
  res.status(200).json(updatedWorkout);
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  validIdCheck(id, res);

  //find and verify workout
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }

  // find and verify user
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({ error: "User not found." });
  }

  //check if the logged in user matches the user attached to the specific workout
  if (user.id !== workout.user.toString()) {
    return res.status(401).json({ error: "User not authorized." });
  }

  const deletedWorkout = await Workout.findByIdAndDelete(id);
  res.status(200).json(deletedWorkout);
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
