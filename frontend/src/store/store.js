// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './gallerySlice';
import authSlice from './authSlice';

export default configureStore({
  reducer: {
    gallery: galleryReducer,
    auth: authSlice,
  },
});
