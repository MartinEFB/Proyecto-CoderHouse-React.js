// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZHQfSNRDrIuhItlxPQmRKixjRfTeveZI",
  authDomain: "proyecto-coderhouse-8da95.firebaseapp.com",
  projectId: "proyecto-coderhouse-8da95",
  storageBucket: "proyecto-coderhouse-8da95.firebasestorage.app",
  messagingSenderId: "77101062513",
  appId: "1:77101062513:web:144f0903f6605e234afed0",
  measurementId: "G-GNP3VBQ247",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const db = getFirestore(app);
