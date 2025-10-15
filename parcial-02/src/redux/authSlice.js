import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const register = createAsyncThunk('auth/register', async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail, displayName } = userCredential.user;
    return { uid, email: userEmail, displayName };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail, displayName } = userCredential.user;
    return { uid, email: userEmail, displayName };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(logout.fulfilled, (state) => { state.user = null; })
      .addCase(logout.rejected, (state, action) => { state.error = action.payload; });
  },
});

export default authSlice.reducer;