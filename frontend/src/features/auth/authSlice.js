import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage which is set in authService
const user = JSON.parse(localStorage.getItem("user"));

//@type THUNK: Register
//@desc calls the authService, passes in user, and either returns the payload or rejects with an error
const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//@type THUNK: Login
//@desc calls the authService, passes in user, and either returns the payload or rejects with an error
const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//@type THUNK: Logout
//@desc calls the authService, passes in user, and awaits local storage item removal
const logout = createAsyncThunk("auth/logut", async (user, thunkAPI) => {
  await authService.logout(user);
});

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
  //Holds async thunk functions
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
