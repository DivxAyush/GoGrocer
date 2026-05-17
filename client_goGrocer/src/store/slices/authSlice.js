import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileNumber: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.mobileNumber = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setMobileNumber, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
