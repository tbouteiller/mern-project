import React from "react";
import { useDispatch } from "react-redux";
import { deleteWorkout } from "../features/workouts/workoutSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Workout = ({ workout }) => {
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
    <div key={workout._id} className="workout">
      <div className="top-card">
        <p>{new Date(workout.createdAt).toDateString()}</p>
      </div>
      <div className="bottom-card">
        {workout.exercise.map((exercise, i) => {
          return (
            <table key={exercise._id}>
              <caption>{exercise.title}</caption>
              <thead>
                <tr key={i}>
                  <td></td>
                  <th scope="col">Reps</th>
                  <th scope="col">Weight</th>
                </tr>
              </thead>
              <tbody>
                {exercise.set.map((set, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <th scope="row">Set {index + 1}</th>
                        <td>{set.reps}</td>
                        <td>{set.weight}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
      <button onClick={removeWorkout}>Delete</button>
      <Link tabIndex={-1} to={`/workout/${workout._id}`}>
        <button>Details</button>
      </Link>
    </div>
  );
};

export default Workout;
