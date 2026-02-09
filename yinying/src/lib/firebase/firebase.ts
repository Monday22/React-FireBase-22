// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "yingying-5ddc7.firebaseapp.com",
  projectId: "yingying-5ddc7",
  storageBucket: "yingying-5ddc7.firebasestorage.app",
  messagingSenderId: "585698412034",
  appId: "1:585698412034:web:906903b66b19a1101cc91b"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)