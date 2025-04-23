// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4SbN3qkxwbeBwZCuvOTDyNXwzX4xQ-Ws",
  authDomain: "quiz-project-14d2f.firebaseapp.com",
  projectId: "quiz-project-14d2f",
  storageBucket: "quiz-project-14d2f.firebasestorage.app",
  messagingSenderId: "860827575083",
  appId: "1:860827575083:web:5969c32ff571a97778db6e",
  measurementId: "G-6T5CLCD9R0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
