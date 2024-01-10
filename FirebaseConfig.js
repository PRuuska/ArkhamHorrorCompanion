// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADkD0TDy0OsmsrL1Q31E9IfNPOcAx39Q0",
  authDomain: "arkhamhorrorcompanion.firebaseapp.com",
  projectId: "arkhamhorrorcompanion",
  storageBucket: "arkhamhorrorcompanion.appspot.com",
  messagingSenderId: "124705954336",
  appId: "1:124705954336:web:ff08e8233166143ee43a45",
  measurementId: "G-8P3LE1KN2V"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
