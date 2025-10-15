import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, signOut } from '../../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { login, logout } from './authSlice';
import { realtimeDb } from '../../../firebase/config';
import { ref, push, onValue } from 'firebase/database';
import { setMessages} from '../firebaseSlice';

export const startLoginWithEmailPassword = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid, displayName, email: userEmail } = userCredential.user;
    dispatch(login({ uid, displayName, email: userEmail }));
  } catch (error) {
    dispatch(logout(error.message));
  }
};

export const startGoogleSignIn = () => async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { uid, displayName, email } = result.user;
    dispatch(login({ uid, displayName, email }));
  } catch (error) {
    dispatch(logout(error.message));
  }
};

export const startRegisterWithEmailPassword = (email, password, displayName) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    const { uid } = userCredential.user;
    dispatch(login({ uid, displayName, email }));
  } catch (error) {
    dispatch(logout(error.message));
  }
};

export const startLogout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
};

export const sendMessageThunk = (message) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth; 
    const messagesRef = ref(realtimeDb, `chats/${uid}`);
    const newMessage = {
      text: message,
      timestamp: Date.now(),
    };
    await push(messagesRef, newMessage);
    ;
  };
};

export const startListeningMessagesThunk = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const messagesRef = ref(realtimeDb, `chats/${uid}`);
    onValue(messagesRef, (snapshot) => {
      const messagesList = [];
      snapshot.forEach((childSnapshot) => {
        messagesList.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      dispatch(setMessages(messagesList));
    });
  };
};