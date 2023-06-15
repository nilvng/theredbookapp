/**
 * Firebase Configuration.
 * 
 * This file contains the configuration for Firebase and initializes the services.
 */

// Firebase Imports
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAzu1mjzrOqKX-0MROl-kOicR6NhpttvZ8",
    authDomain: "redbookapp-412c2.firebaseapp.com",
    projectId: "redbookapp-412c2",
    storageBucket: "redbookapp-412c2.appspot.com",
    messagingSenderId: "13215877824",
    appId: "1:13215877824:web:7412a57acdc17b6b8c7b25",
    measurementId: "G-T76LCBQY4N"
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

// Enable access to Firebase's authentication and database services
const auth = firebase.auth(app);
const db = firebase.firestore(app);

export { auth, db };