// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1uYHoLks4Y7PS74SSjJoi5ikwld0YAgo",
  authDomain: "mobilebudgetingapp.firebaseapp.com",
  projectId: "mobilebudgetingapp",
  storageBucket: "mobilebudgetingapp.appspot.com",
  messagingSenderId: "934129244672",
  appId: "1:934129244672:web:7a285ed8d85945fd8716e5"
};


// Initialize Firebase
const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const db =getFirestore()

export default {auth,db}
