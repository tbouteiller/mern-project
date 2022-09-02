import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkouts, reset } from "../features/workouts/workoutSlice";
import Workout from "../components/Workout";
import Spinner from "../components/Spinner";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { workouts, isLoading } = useSelector(
    (state) => state.workout
  );

  //@type HOOK: useEffect
  //@desc Handles side effects and rerenders when state changes - Renavigates if user isn't valid, dispatches all workouts.
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getAllWorkouts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1>Workouts</h1>
          <div>
            {workouts.map((workout) => {
              return <Workout key={workout._id} workout={workout} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
