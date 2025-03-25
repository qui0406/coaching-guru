// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import React from "react";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArBhCV2iFqqkchkjrM8ExOCtiCSxnQTZ0",
  authDomain: "projects-2025-e068a.firebaseapp.com",
  projectId: "projects-2025-e068a",
  storageBucket: "projects-2025-e068a.firebasestorage.app",
  messagingSenderId: "530945228441",
  appId: "1:530945228441:web:0209b0b63a2fa02f9ac208",
  measurementId: "G-KFX4NQ6R2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db= getFirestore(app)
const analytics = getAnalytics(app);