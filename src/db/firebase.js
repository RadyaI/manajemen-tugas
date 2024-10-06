// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK-gcr5fRw0wAWTCtFAl4ttG0VgTuALe0",
  authDomain: "radya-personal.firebaseapp.com",
  projectId: "radya-personal",
  storageBucket: "radya-personal.appspot.com",
  messagingSenderId: "343479055201",
  appId: "1:343479055201:web:de8e8b1c1fbf1dccd5cb20",
  measurementId: "G-FHG2BSP40Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}