import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './slices/adminSlice';
import supplierSlice from './slices/supplierSlice';

const store = configureStore({
  reducer: {
    admin: adminSlice,
    supplier: supplierSlice
  },
});

export default store;
