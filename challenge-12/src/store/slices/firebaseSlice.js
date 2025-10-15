import { createSlice } from '@reduxjs/toolkit';

export const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { setMessages, addMessage } = firebaseSlice.actions;

export default firebaseSlice.reducer;