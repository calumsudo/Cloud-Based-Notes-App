// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC0XIcsavCy1eIhiXcN3VL219YFWDc_JRA",
  authDomain: "notes-app-c5a88.firebaseapp.com",
  projectId: "notes-app-c5a88",
  storageBucket: "notes-app-c5a88.appspot.com",
  messagingSenderId: "61101129422",
  appId: "1:61101129422:web:c16d3019a6edcafcbd5a9f",
  measurementId: "G-07RX2G3R1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const functions = getFunctions(app);

export { app, auth, provider, functions };
export default app;