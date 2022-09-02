import axios from "axios";

const API_URL = "/api/workouts/";

//@type createWorkout service function
//@route /api/workouts/
//@desc sends POST request to server with a users workout data, including the token, and creates the workout.
const createWorkout = async (workoutData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, { exercise: workoutData }, config);

  return response.data;
};

//@type deleteWorkout service function
//@route /api/workouts/:id
//@desc sends DELETE request to server with a users individual workout id, including the token, and deletes the workout.
const deleteWorkout = async (workoutId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + workoutId, config);

  return response.data;
};

//@type getAllWorkouts service function
//@route /api/workouts/
//@desc sends GET request to server with a users token, and returns all of the users workouts.
const getAllWorkouts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

//@type getSingleWorkout service function
//@route /api/workouts/:id
//@desc sends GET request to server with an individual workout id, user's token, and returns the workout matching the id.
const getSingleWorkout = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 
  const response = await axios.get(API_URL + id, config);
  
  return response.data;
};

const workoutService = {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getSingleWorkout,
};
export default workoutService;
