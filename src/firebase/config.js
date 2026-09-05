import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAJyDAIgTHNZZhGTgXhClhx0SFLig6HlJo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "krishivision-c4bfc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "krishivision-c4bfc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "krishivision-c4bfc.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "377090886982",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:377090886982:web:c45af31ca0a53096262947",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LYRFNL4TK5"
};

// Initialize Firebase App & Cloud Firestore DB
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const isFirebaseConfigured = true;
