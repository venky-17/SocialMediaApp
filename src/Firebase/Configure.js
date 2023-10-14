// Import the functions you need from the SDKs you need
import { initializeApp , } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEwYG3CyudDOXjZzgkjhBQj9MUX_wNbB4",
  authDomain: "socialmedia-1f02d.firebaseapp.com",
  projectId: "socialmedia-1f02d",
  storageBucket: "socialmedia-1f02d.appspot.com",
  messagingSenderId: "1028192603588",
  appId: "1:1028192603588:web:65007a223f599a4889a891",
  measurementId: "G-5102X63D9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

