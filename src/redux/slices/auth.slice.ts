import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  initialized: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  initialized: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialized: (state: AuthState, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },

    setAuthorizationStatus: (
      state: AuthState,
      action: PayloadAction<boolean>,
    ) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {setAuthorizationStatus, setInitialized} = authSlice.actions;
