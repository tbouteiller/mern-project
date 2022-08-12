import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleWorkout, reset } from "../features/workouts/workoutSlice";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BarChart from "../components/BarChart";

const SingleWorkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { workouts, workout, isLoading, isError, message } = useSelector(
    (state) => state.workout
  );
  const { id } = useParams();

  //@type HOOK: useEffect
  //@desc Handles side effects and rerenders when state changes - Renavigates if user isn't valid, dispatches a single workout.
  useEffect(() => {
    if (isError) {
      console.log(message);
      return;
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getSingleWorkout(id));

    return () => {
      dispatch(reset());
    };
  }, [user, id, navigate, isError, message, dispatch]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="workout">
          <p>{new Date(workout.createdAt).toDateString()}</p>
          {workout?.exercise?.map((exercise, i) => {
            return (
              <>
                <BarChart key={i} workout={workout} exercise={exercise} />
                <div className="bottom-card" key={exercise._id}>
                  <p>Exercise: {exercise.title}</p>
                  <div>
                    {exercise.set.map((set, index) => {
                      return (
                        <div key={set._id}>
                          <span>
                            Set {index + 1} - Reps: {set.reps}, Weight:{" "}
                            {set.weight}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SingleWorkout;
