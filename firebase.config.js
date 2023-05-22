// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth' // will help with sign up page 
import { getFirestore, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg3ZUXj6uDLk-3Ej3pLfwlmwCFD1r9FGM",
  authDomain: "mobile-budgeting-app.firebaseapp.com",
  projectId: "mobile-budgeting-app",
  storageBucket: "mobile-budgeting-app.appspot.com",
  messagingSenderId: "647790618342",
  appId: "1:647790618342:web:85533a4d00e9b94d523d27",
  measurementId: "G-ZS77NTTZBT"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // This will help with sign up page with authentication servers 
const db = getFirestore(app);

export { app, auth, db, firebaseConfig, firebase}
