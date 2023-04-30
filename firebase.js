// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore,getDocs } from "firebase/firestore/lite";


// Your web app's Firebase configuration
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
 const app=initializeApp(firebaseConfig)
 const auth=getAuth(app)


 const db =getFirestore(app)
export  {auth,db,app,firebaseConfig}
