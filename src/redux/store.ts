import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;

