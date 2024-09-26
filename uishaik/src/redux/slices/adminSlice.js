import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminLoggedIn: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login(state) {
      state.adminLoggedIn = true;
    },
    logout(state) {
      state.adminLoggedIn = false;
    }
  }
});

export const { login, logout } = adminSlice.actions;

export default adminSlice.reducer;
