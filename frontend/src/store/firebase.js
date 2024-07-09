// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDsDfby3kS0FcOLnEmkrQcdj-ObvMvbBLc",
    authDomain: "shotokan-18.firebaseapp.com",
    projectId: "shotokan-18",
    storageBucket: "shotokan-18.appspot.com",
    messagingSenderId: "1085038794913",
    appId: "1:1085038794913:web:b0941063c323bec910f8e0",
    measurementId: "G-W4WKXZN2M8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  } catch (error) {
    console.error(error);
  }
};

export { auth, signInWithGoogle };
