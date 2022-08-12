import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../features/workouts/workoutSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WorkoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [setData, setSetData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseToggle, setexerciseToggle] = useState(false);
  const [workoutToggle, setWorkoutToggle] = useState(false);

  //@type FUNCTION: completeWorkout
  //@desc Creates the users workout which includes all of their individual exercises.
  const completeWorkout = () => {
    //dispatch function to complete the workout
    dispatch(createWorkout(exerciseData));
    setExerciseData([]);
    setWorkoutToggle(false);
    navigate("/login");
    toast.success("Workout added!", {
      theme: "colored",
    });
  };

  //@type FUNCTION: handleChange
  //@desc Tracks the inputted value for the set weight and reptitions
  const handleChange = (index, e) => {
    let data = [...setData];
    data[index][e.target.name] = e.target.value;
    setSetData(data);
  };

  //@type FUNCTION: addExercise
  //@desc Adds an object to the exerciseData array which includes title, and a set array.
  const addExercise = () => {
    setExerciseData([...exerciseData, { title: title, set: setData }]);
    setSetData([]);
    setTitle("");
    setexerciseToggle(false);
    setWorkoutToggle(true);
    toast.success("Exercise added!", {
      theme: "colored",
    });
  };

  //@type FUNCTION: addSet
  //@desc Dynamically adds input fields for a set (reps, weight) and captures setData in array when clicked.
  const addSet = () => {
    let newfield = { reps: "", weight: "" };
    setSetData([...setData, newfield]);
    setexerciseToggle(true);
  };

  //@type FUNCTION: addSet
  //@desc Dynamically removes input fields for a set (reps, weight) and recaptures setData in array when clicked.
  const removeSet = (index) => {
    let data = [...setData];
    data.splice(index, 1);
    setSetData(data);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          {workoutToggle ? (
            <h2>Add another exercise</h2>
          ) : (
            <h2>Add exercise</h2>
          )}
          <label htmlFor="title">Exercise Name</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="ex. Bench Press"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {setData.map((input, index) => {
            return (
              <div key={index}>
                <label htmlFor="reps">Reps:</label>
                <input
                  name="reps"
                  placeholder="Reps"
                  value={input.reps}
                  onChange={(e) => handleChange(index, e)}
                />
                <label htmlFor="weight">Weight:</label>
                <input
                  name="weight"
                  placeholder="Weight"
                  value={input.weight}
                  onChange={(e) => handleChange(index, e)}
                />
                <button onClick={() => removeSet(index)}>Remove</button>
              </div>
            );
          })}
        </div>
        <div className="form-buttons">
          <button type="button" onClick={addSet}>
            Add Set
          </button>
          {exerciseToggle && (
            <button type="button" onClick={addExercise}>
              Add Exercise
            </button>
          )}
          {workoutToggle && (
            <button type="button" onClick={completeWorkout}>
              Complete Workout
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default WorkoutForm;
