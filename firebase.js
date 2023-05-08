// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const analytics = firebase.getAnalytics(app);

const auth = firebase.auth();

export { auth, analytics };