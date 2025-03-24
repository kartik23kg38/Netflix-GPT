// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "netflixgpt-2-453815.firebaseapp.com",
  projectId: "netflixgpt-2-453815",
  storageBucket: "netflixgpt-2-453815.firebasestorage.app",
  messagingSenderId: "182129524451",
  appId: "1:182129524451:web:ef7b067d152a9c53a94fd6",
  measurementId: "G-Q31779TCS0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
