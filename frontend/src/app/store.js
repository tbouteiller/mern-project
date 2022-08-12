import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { workoutReducer } from "../features/workouts/workoutSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
  },
});
