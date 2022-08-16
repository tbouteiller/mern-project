import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleWorkout, reset } from "../features/workouts/workoutSlice";
import { useParams } from "react-router-dom";
import SingleWorkout from "../pages/SingleWorkout";
import { toast } from "react-toastify";

const Guard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isError, message } = useSelector((state) => state.workout);
  const { id } = useParams();

  //@type HOOK: useEffect
  //@desc Handles side effects and rerenders when state changes - Renavigates if user isn't valid, dispatches to get single workout or redirects to home page.
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getSingleWorkout(id));

    if (isError) {
      toast.error(message);
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, user, navigate, dispatch]);

  return <SingleWorkout />;
};

export default Guard;
