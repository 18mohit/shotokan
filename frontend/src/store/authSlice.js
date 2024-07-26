// src/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
  },
  reducers: {
    //actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions; 
export default authSlice.reducer;
