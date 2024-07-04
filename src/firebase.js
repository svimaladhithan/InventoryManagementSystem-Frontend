// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "inventory-f8a21.firebaseapp.com",
  projectId: "inventory-f8a21",
  storageBucket: "inventory-f8a21.appspot.com",
  messagingSenderId: "290620723085",
  appId: "1:290620723085:web:cbddf99ca0d3a32a84b7c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);