// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYR9XteA8NUzb0hk3XREdSEvJrhCvbDw4",
  authDomain: "smartup24-4bd70.firebaseapp.com",
  projectId: "smartup24-4bd70",
  storageBucket: "smartup24-4bd70.appspot.com",
  messagingSenderId: "920191609877",
  appId: "1:920191609877:web:74009b131274ccb9ae321c",
  measurementId: "G-CN3RLLSB97"
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);