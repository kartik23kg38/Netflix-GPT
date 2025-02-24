// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-gpt-58c38.firebaseapp.com",
  projectId: "netflix-gpt-58c38",
  storageBucket: "netflix-gpt-58c38.firebasestorage.app",
  messagingSenderId: "169613243271",
  appId: "1:169613243271:web:bd5e49f61361891aab5922",
  measurementId: "G-SWWLZG9EVE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

