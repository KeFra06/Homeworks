import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Stack from '../dataStructures/Stack';
import { auth } from '../firebase/config';

const initialState = { stack: new Stack() };

export const loadNotifications = createAsyncThunk('notifications/loadNotifications', async () => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, 'notifications', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().items;
    }
  }
  return [];
});

export const saveNotifications = createAsyncThunk('notifications/saveNotifications', async (_, { getState }) => {
  const user = auth.currentUser;
  if (user) {
    const state = getState().notifications.stack.toArray();
    await setDoc(doc(db, 'notifications', user.uid), { items: state });
  }
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.stack.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadNotifications.fulfilled, (state, action) => {
      state.stack = Stack.fromArray(action.payload);
    });
  },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;