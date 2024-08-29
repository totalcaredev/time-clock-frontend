import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  accessToken: localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken")!)
  : null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      if (action.payload) {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.user = action.payload;
      }
    },
    setToken(state, action) {
      localStorage.setItem("accessToken", JSON.stringify(action.payload));
      state.accessToken = action.payload;
    },
    logOut(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.clear();
    },
  },
});

export const { setUser, logOut,setToken } = userSlice.actions;
export default userSlice.reducer;
