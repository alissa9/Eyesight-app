// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfU_nS8HeCbR63u0IKzLabehz0p59hxsA",
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
