import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth.slice';
import { SnackbarSlice } from './slices/snackbar.slice';
import { userSlice } from './slices/user.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    snackbar: SnackbarSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

