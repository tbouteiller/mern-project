import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import workoutService from "./workoutService";

//@type THUNK: createWorkout
//@desc calls the workoutService, passes workoutData + token, and either returns the payload or rejects with an error
export const createWorkout = createAsyncThunk(
  "workout/create",
  async (workoutData, thunkAPI) => {
    try {
      //use thunkAPI.getState() to get the user token
      const token = thunkAPI.getState().auth.user.token;
      //try to use service to reach api
      return await workoutService.createWorkout(workoutData, token);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.error);
    }
  }
);

//@type THUNK: deleteWorkout
//@desc calls the workoutService, passes id + token, and either deletes the workout or rejects with an error
export const deleteWorkout = createAsyncThunk(
  "workout/delete",
  async (id, thunkAPI) => {
    try {
      //use thunkAPI.getState() to get the user token
      const token = thunkAPI.getState().auth.user.token;
      //try to use service to reach api
      return await workoutService.deleteWorkout(id, token);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.error);
    }
  }
);

//@type THUNK: getAllWorkouts
//@desc calls the workoutService, passes token, and either returns the payload (all workouts) or rejects with an error.
export const getAllWorkouts = createAsyncThunk(
  "workout/getAllWorkouts",
  async (_, thunkAPI) => {
    try {
      //use thunkAPI.getState() to get the user token
      const token = thunkAPI.getState().auth.user.token;
      //try to use service to reach api
      return await workoutService.getAllWorkouts(token);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.error);
    }
  }
);

//@type THUNK: getSingleWorkout
//@desc calls the workoutService, passes id + token, and either returns the payload (single workout) or rejects with an error.
export const getSingleWorkout = createAsyncThunk(
  "workout/getSingleWorkout",
  async (id, thunkAPI) => {
    try {
      //use thunkAPI.getState() to get the user token
      const token = thunkAPI.getState().auth.user.token;
      //try to use service to reach api
      return await workoutService.getSingleWorkout(id, token);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.error);
    }
  }
);

//@type SLICE: workoutSlice
//@desc Slice name (auth), Initial state, and a object of reducer functions
export const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
    workout: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.workouts = [];
      state.workout = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts.push(action.payload);
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWorkouts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts = action.payload;
      })
      .addCase(getAllWorkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        );
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workout = action.payload;
      })
      .addCase(getSingleWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = workoutSlice.actions;
export const workoutReducer = workoutSlice.reducer;
