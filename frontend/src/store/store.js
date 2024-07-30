import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './gallerySlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    gallery: galleryReducer,
    auth: authReducer,
  },
});
