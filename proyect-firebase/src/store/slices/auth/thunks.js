import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { login } from './authSlice';

export const registerAuth = (email, password) => {
  return async (dispatch) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    if (response) {
      await updateProfile(auth.currentUser, {
        displayName: 'KeFra',
        photoURL: ''
      });
      const { uid, email, displayName, photoURL } = auth.currentUser;
      dispatch(login({ uid, email, displayName, photoURL }));
    } else {
      throw new Error('login failed');
    }
  };
};