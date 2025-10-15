import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import LinkedList from '../dataStructures/LinkedList';
import { auth } from '../firebase/config';

const initialState = { list: new LinkedList() };

export const loadPosts = createAsyncThunk('posts/loadPosts', async () => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, 'posts', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().items;
    }
  }
  return [];
});

export const savePosts = createAsyncThunk('posts/savePosts', async (_, { getState }) => {
  const user = auth.currentUser;
  if (user) {
    const state = getState().posts.list.toArray();
    await setDoc(doc(db, 'posts', user.uid), { items: state });
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.list.append(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.list = LinkedList.fromArray(action.payload);
    });
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;