// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth' // will help with sign up page 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAPI468Wl9HNGcU3KJVtmMVq_Jy_DGEno",
  authDomain: "mobile-budgeting-app.firebaseapp.com",
  projectId: "mobile-budgeting-app",
  storageBucket: "mobile-budgeting-app.appspot.com",
  messagingSenderId: "647790618342",
  appId: "1:647790618342:web:85533a4d00e9b94d523d27",
  measurementId: "G-ZS77NTTZBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); // This will help with sign up page with authentication servers 
export const db = getFirestore(app);