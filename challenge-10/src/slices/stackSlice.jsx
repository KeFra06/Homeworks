import { createSlice } from '@reduxjs/toolkit';

const stackSlice = createSlice({
  name: 'stack',
  initialState: {
    stack: []
  },
  reducers: {
    push: (state, action) => {
      state.stack.push(action.payload);
    },
    pop: (state) => {
      state.stack.pop();
    }
  }
});

export const { push, pop } = stackSlice.actions;
export default stackSlice.reducer;