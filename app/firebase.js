// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FirebaseApiKey,
  authDomain: process.env.NEXT_PUBLIC_FirebaseAuthDomain,
  projectId: process.env.NEXT_PUBLIC_FirebaseprojectId,
  storageBucket: process.env.NEXT_PUBLIC_FirebasestorageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FirebasemessagingSenderId,
  appId: process.env.NEXT_PUBLIC_FirebaseappId,
  measurementId: process.env.NEXT_PUBLIC_FirebasemeasurementId,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
