const mongoose = require("mongoose"); //mongoose allows creation of models + schemas

//structure of document
const Schema = mongoose.Schema;

//create schema object -> pass in object which defines schema
const workoutSchema = new Schema(
  {
    exercise: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//create model and pass in schema
module.exports = mongoose.model("Workout", workoutSchema);
