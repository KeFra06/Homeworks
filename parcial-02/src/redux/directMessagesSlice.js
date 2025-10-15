import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Queue from '../dataStructures/Queue';
import { auth } from '../firebase/config';

const initialState = { queue: new Queue() };

export const loadDirectMessages = createAsyncThunk('directMessages/loadDirectMessages', async () => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, 'directMessages', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().items;
    }
  }
  return [];
});

export const saveDirectMessages = createAsyncThunk('directMessages/saveDirectMessages', async (_, { getState }) => {
  const user = auth.currentUser;
  if (user) {
    const state = getState().directMessages.queue.toArray();
    await setDoc(doc(db, 'directMessages', user.uid), { items: state });
  }
});

const directMessagesSlice = createSlice({
  name: 'directMessages',
  initialState,
  reducers: {
    addDirectMessage: (state, action) => {
      state.queue.enqueue(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDirectMessages.fulfilled, (state, action) => {
      state.queue = Queue.fromArray(action.payload);
    });
  },
});

export const { addDirectMessage } = directMessagesSlice.actions;
export default directMessagesSlice.reducer;