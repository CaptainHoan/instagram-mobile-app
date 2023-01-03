// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoAULjak4FFlSSeMl-ULWp4Gs_jqjJn74",
  authDomain: "instagram-moble-app.firebaseapp.com",
  projectId: "instagram-moble-app",
  storageBucket: "instagram-moble-app.appspot.com",
  messagingSenderId: "474041358451",
  appId: "1:474041358451:web:389a9721af0f11f0b7f206"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth  = getAuth(app)
export const db = getFirestore(app)