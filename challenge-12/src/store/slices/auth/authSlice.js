import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.errorMessage = payload || null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;