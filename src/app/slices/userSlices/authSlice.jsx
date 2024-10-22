'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.userInfo = action.payload;
            console.log('Setting credentials:', action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
                console.log('Saved to localStorage:', action.payload);
            }
        },
        logOut(state) {
            state.userInfo = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userInfo');
            }
        },
        initializeState(state) {
            if (typeof window !== 'undefined') {
                const storedUserInfo = localStorage.getItem('userInfo');
                if (storedUserInfo) {
                    state.userInfo = JSON.parse(storedUserInfo);
                }
            }
        }
    }
});

export const { setCredentials, logOut, initializeState } = authSlice.actions;

export default authSlice.reducer;