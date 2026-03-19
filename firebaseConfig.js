import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBqMTmLXZa_2Lub9I3I2Jxx1IHJdFMeI88",
    authDomain: "auth-component-84e92.firebaseapp.com",
    projectId: "auth-component-84e92",
    storageBucket: "auth-component-84e92.firebasestorage.app",
    messagingSenderId: "691486643250",
    appId: "1:691486643250:web:d769e66c2162906c8e582b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)