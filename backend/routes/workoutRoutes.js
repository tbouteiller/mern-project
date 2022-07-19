const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  postWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

router.get("/", getAllWorkouts);
router.get("/:id", getWorkout);
router.post("/", postWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;
