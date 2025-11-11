import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
});
export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;

