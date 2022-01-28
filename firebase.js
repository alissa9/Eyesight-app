import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "fusion-services.firebaseapp.com",
  projectId: "fusion-services",
  storageBucket: "fusion-services.appspot.com",
  messagingSenderId: "86681265127",
  appId: "1:86681265127:web:1e5c4ac8f2cd0555efd342",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
