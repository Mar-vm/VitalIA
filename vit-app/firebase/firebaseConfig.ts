// firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyBKn9DishqwelE5PiqTKR480a_HqRwWCDI",
    authDomain: "vitalia-5695f.firebaseapp.com",
    projectId: "vitalia-5695f",
    storageBucket: "vitalia-5695f.firebasestorage.app",
    messagingSenderId: "1062696153279",
    appId: "1:1062696153279:web:c029255c942775333fd60a",
    measurementId: "G-1EWD7TTMB2"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
