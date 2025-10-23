import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/login";
import blogService from "../services/blogs";
import reducer, { Notify } from "./notification";


const initialState = {
  username: "",
  password: "",
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser(state, action) {
      const loggedUser = localStorage.getItem("loggedInUser");
      if (loggedUser) {
        state.user = JSON.parse(loggedUser);
      }
    },
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
      blogService.setToken(action.payload.token);
    },
    logout(state, action) {
      localStorage.removeItem("loggedInUser");
      state.user = null;
    },
  },
});

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await userService.loginUser({ username, password });
      dispatch(login(loggedInUser));
      dispatch(
        Notify({ type: "success", content: "User successfully loggged in" })
      );
    } catch (err) {
      dispatch(Notify({ type: "error", content: "Log in failed" }));
    }
  };
};

export default userSlice.reducer;
export const {logout, login, initializeUser} = userSlice.actions
