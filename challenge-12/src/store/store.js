import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import firebaseReducer from '../store/slices/firebaseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    firebase: firebaseReducer,
  },
});