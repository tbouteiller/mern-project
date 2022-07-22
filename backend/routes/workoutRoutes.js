const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAllWorkouts,
  getWorkout,
  postWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

router.get("/", protect, getAllWorkouts);
router.get("/:id", protect, getWorkout);
router.post("/", protect, postWorkout);
router.put("/:id", protect, updateWorkout);
router.delete("/:id", protect, deleteWorkout);

module.exports = router;
