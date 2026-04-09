import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface SnackbarState {
  visible: boolean;
  type: SnackbarType;
  message: string;
  duration?: number;
}

export enum SnackbarType {
  error = 'Error',
  success = 'Success',
}

const initialState: SnackbarState = {
  visible: false,
  type: SnackbarType.success,
  message: '',
  duration: 2000,
};



export const SnackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        duration?: number;
        type?: SnackbarType;
      }>,
    ) => {
      state.visible = true;
      state.message = action.payload.message;
      state.duration = action.payload.duration || initialState.duration;
      if (action.payload?.type) {
        state.type = action.payload.type;
      }
    },
    hideSnackbar: state => {
      state.visible = false;
      state.message = '';
    },

    showSnackbarSuccess: (
      state,
      action: PayloadAction<{ message: string; duration?: number }>,
    ) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = SnackbarType.success;
      state.duration = action.payload.duration || initialState.duration;
    },
    showSnackbarError: (
      state,
      action: PayloadAction<{ message: string; duration?: number }>,
    ) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = SnackbarType.error;
      state.duration = action.payload.duration || initialState.duration;
    },
  },
});

export const {
  showSnackbar,
  hideSnackbar,
  showSnackbarError,
  showSnackbarSuccess,
} = SnackbarSlice.actions;
