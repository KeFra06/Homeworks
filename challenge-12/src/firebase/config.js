import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC7xkdiQejIqcOVPSmNttaFbQFVZnTx_zw",
  authDomain: "proyecto-firebase-bb4f6.firebaseapp.com",
  databaseURL: "https://proyecto-firebase-bb4f6-default-rtdb.firebaseio.com",
  projectId: "proyecto-firebase-bb4f6",
  storageBucket: "proyecto-firebase-bb4f6.appspot.com", 
  messagingSenderId: "1038918683697",
  appId: "1:1038918683697:web:957b7fc9709502b26f9910"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const firebaseStorage = getStorage(app);
const realtimeDb = getDatabase(app);
const db = getFirestore(app);

export { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, signOut, firebaseStorage, db, realtimeDb };