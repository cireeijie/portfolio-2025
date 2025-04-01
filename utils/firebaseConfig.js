// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuKQuzftgdPtXP_9LLyeJTJQrXa2ZSlAs",
  authDomain: "portfolio-data-2a060.firebaseapp.com",
  projectId: "portfolio-data-2a060",
  storageBucket: "portfolio-data-2a060.firebasestorage.app",
  messagingSenderId: "430960338338",
  appId: "1:430960338338:web:052c8575a6b49dc7143efb",
  measurementId: "G-GE31YEFR8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);