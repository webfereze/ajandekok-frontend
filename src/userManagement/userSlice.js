import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            return { ...action.payload };
        },
        logout: (state) => {
            return {};
        },
    },
});

export const { setUser,logout } = userSlice.actions;
export default userSlice.reducer;