// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Create a root reference
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnCAdmaTyHPSW3fHt7ysf4Urm-fvmH93E",
  authDomain: "react-chat-app-b10a7.firebaseapp.com",
  projectId: "react-chat-app-b10a7",
  storageBucket: "react-chat-app-b10a7.appspot.com",
  messagingSenderId: "1012948027476",
  appId: "1:1012948027476:web:0fb82e8a795976eb01c5c1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage();
export const db = getFirestore(app);
