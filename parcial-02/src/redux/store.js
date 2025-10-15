import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './postsSlice';
import notificationsReducer from './notificationsSlice';
import directMessagesReducer from './directMessagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    directMessages: directMessagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});