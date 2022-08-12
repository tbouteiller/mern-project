import React from "react";
import { useDispatch } from "react-redux";
import { deleteWorkout } from "../features/workouts/workoutSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Workout = ({ workout, index }) => {
  const dispatch = useDispatch();

  //@type FUNCTION: removeWorkout
  //@desc Handles the functionality for deleting a workout when a user clicks the delete button.
  const removeWorkout = () => {
    dispatch(deleteWorkout(workout._id));
    toast.info("Workout has been deleted!", {
      theme: "colored",
    });
  };

  return (
    <div className="workout">
      <div className="top-card">
        <p>{new Date(workout.createdAt).toDateString()}</p>
      </div>
      {workout.exercise.map((exercise, i) => {
        return (
          <div className="bottom-card" key={exercise._id}>
            <p>{exercise.title}</p>
            <div>
              {exercise.set.map((set, index) => {
                return (
                  <div key={set._id}>
                    <span>
                      Set {index + 1} - Reps: {set.reps}, Weight: {set.weight}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <button onClick={removeWorkout}>Delete</button>
      <Link to={`/workout/${workout._id}`}>
        <button>Details</button>
      </Link>
    </div>
  );
};

export default Workout;
