// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACRhCzucemndsQX6QIM7qXxnIerbiP6pQ",
  authDomain: "generator-5ecec.firebaseapp.com",
  projectId: "generator-5ecec",
  storageBucket: "generator-5ecec.appspot.com",
  messagingSenderId: "882467214248",
  appId: "1:882467214248:web:720b7326a3efe50ebf039d",
  measurementId: "G-851S99W4E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();