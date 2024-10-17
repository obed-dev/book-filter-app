// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHQCQhKzIBs-T4mCB2rZGtXpGjHHOJmJw",
  authDomain: "book-filter-app.firebaseapp.com",
  projectId: "book-filter-app",
  storageBucket: "book-filter-app.appspot.com",
  messagingSenderId: "70066050991",
  appId: "1:70066050991:web:961a3d46bf2c594f0e015a",
  measurementId: "G-X414E0RLJX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);