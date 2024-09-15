// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-project-f7f29.firebaseapp.com",
  projectId: "mern-project-f7f29",
  storageBucket: "mern-project-f7f29.appspot.com",
  messagingSenderId: "292476267899",
  appId: "1:292476267899:web:5d85b68fad7bfba2ffe1de"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);