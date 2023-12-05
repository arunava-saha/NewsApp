// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNA3kvJu27mK_fHQZkU6jPljuJOauokJE",
  authDomain: "news-app-f1d12.firebaseapp.com",
  projectId: "news-app-f1d12",
  storageBucket: "news-app-f1d12.appspot.com",
  messagingSenderId: "345984333343",
  appId: "1:345984333343:web:7c6b4a299cb9b81cb6872a",
  measurementId: "G-4Y6MRTYNJK",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
