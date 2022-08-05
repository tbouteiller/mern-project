import axios from "axios";

const API_URL = "/api/users/";

//@type REGISTER service function
//@route /api/users
//@desc sends POST request to server and stores data, including the token, in response.data
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//@type LOGIN service function
//@route /api/users/login
//@desc sends POST request to server and stores data, including the token, in response.data
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//@type LOGOUT service function
//@desc Removes user from local storage
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };
export default authService;
