// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsoVKlCZKbAQInh_-0VmwukigdrBmN6i8",
  authDomain: "genix-ee7a9.firebaseapp.com",
  projectId: "genix-ee7a9",
  storageBucket: "genix-ee7a9.firebasestorage.app",
  messagingSenderId: "1079221870168",
  appId: "1:1079221870168:web:32ef235bda27290bfc342d",
  measurementId: "G-G6WBVS84H6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
