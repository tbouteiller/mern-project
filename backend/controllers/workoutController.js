const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET all
const getAllWorkouts = async (req, res) => {
  try {
    const workout = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET single
const getWorkout = async (req, res) => {
  const { id } = req.params;

  //return error if id is an invalid type
  checkForValidId(id);

  const workout = await Workout.findById(id);

  //return workout status
  returnStatus(workout, res);
};

//POST
const postWorkout = async (req, res) => {
  const { exercise, reps, weight } = req.body;

  const workout = await Workout.create({ exercise, reps, weight }); //use workout model to create new document

  returnStatus(workout, res);
};

//DELETE
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  checkForValidId(id);

  const workout = await Workout.findOneAndDelete({ _id: id });

  returnStatus(workout, res);
};

//UPDATE
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  checkForValidId(id);

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  returnStatus(workout, res);
};

//helper functions
const checkForValidId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
};

const returnStatus = (workout, res) => {
  return !workout
    ? res.status(400).json({ error: "Workout not found." })
    : res.status(200).json(workout);
};

module.exports = {
  getWorkout,
  getAllWorkouts,
  postWorkout,
  deleteWorkout,
  updateWorkout,
};
