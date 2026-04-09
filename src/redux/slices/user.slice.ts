import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
    fullname: string | null;
    email: string | null;
}

const initialState: UserState = {
    fullname: null,
    email: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<UserState>) => {
            state.fullname = action.payload.fullname;
            state.email = action.payload.email;
        },
    }
});

export const { setUser } = userSlice.actions;
