import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  supplierLoggedIn: false,
};

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    login(state) {
      state.supplierLoggedIn = true;
    },
    logout(state) {
      state.supplierLoggedIn = false;
    }
  }
});

export const { login, logout } = supplierSlice.actions;

export default supplierSlice.reducer;
