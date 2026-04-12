import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
    fullname: string | null;
    phone: string | null;
}

const initialState: UserState = {
    fullname: null,
    phone: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<UserState>) => {
            state.fullname = action.payload.fullname;
            state.phone = action.payload.phone;
        },
    }
});

export const { setUser } = userSlice.actions;
