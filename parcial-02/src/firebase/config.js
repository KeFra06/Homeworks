import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4aNh9c0MYJOpsfz624lZyrIGvklvjd90",
  authDomain: "parcial02-c481d.firebaseapp.com",
  projectId: "parcial02-c481d",
  storageBucket: "parcial02-c481d.appspot.com",
  messagingSenderId: "101662999815",
  appId: "1:101662999815:web:95a3ed7def9103a18831a2",
  measurementId: "G-01FPZKNQNM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 