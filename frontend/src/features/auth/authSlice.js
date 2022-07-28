import { createSlice } from "@reduxjs/toolkit";

//Get user from local storage which is set in authService
const user = JSON.parse(localStorage.getItem("user"));

//@type SLICE: authSlice
//@desc Slice name (auth), Initial state, and a object of reducer functions
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  //Will hold async thunk functions that will use authService to make requests
  extraReducers: (builder) => {},
});

export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
