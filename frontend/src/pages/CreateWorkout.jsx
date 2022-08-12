import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WorkoutForm from "../components/WorkoutForm";
import { getAllWorkouts, reset } from "../features/workouts/workoutSlice";

const CreateWorkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isError, message } = useSelector((state) => state.workout);

  //@type HOOK: useEffect
  //@desc Handles side effects and rerenders when state changes - Renavigates if user isn't valid
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div>
      <WorkoutForm />
    </div>
  );
};

export default CreateWorkout;
