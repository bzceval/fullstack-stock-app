import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
  },
  reducers: {
    FETCH_START: (state) => {
      state.loading = true;
      state.error = false;
    },
    LOGIN_SUCCESS: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.currentUser = payload?.user?.username;
      state.isAdmin = payload?.user?.is_superuser;
      state.token = payload?.key;
    },
    LOGOUT_SUCCESS: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
    },
    REGISTER_SUCCESS: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.username;
      state.token = payload?.token;
      state.error = false;
    },
    FETCH_FAIL: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export const {
  FETCH_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  FETCH_FAIL,
} = authSlice.actions;
export default authSlice.reducer;
