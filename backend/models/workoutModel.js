const mongoose = require("mongoose");
const workoutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    exercise: [
      {
        title: { type: String, require: true },
        set: [
          {
            reps: { type: Number, require: true },
            weight: { type: Number, require: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
