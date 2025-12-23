import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGnccTQn6cWCp0S34KhrXDyAHm-43bLg8",
  authDomain: "english-with-ryc.firebaseapp.com",
  projectId: "english-with-ryc",
  storageBucket: "english-with-ryc.firebasestorage.app",
  messagingSenderId: "1094084990534",
  appId: "1:1094084990534:web:ce974d2a79562438995c47",
  measurementId: "G-HJE8SL2KPZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
