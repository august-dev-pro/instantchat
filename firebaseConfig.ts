// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: Object = {
  apiKey: "AIzaSyDlMPEgpeTlsIl9-Aykq8uoRhs0SrODGiw",
  authDomain: "chat-app-a5c36.firebaseapp.com",
  projectId: "chat-app-a5c36",
  storageBucket: "chat-app-a5c36.appspot.com",
  messagingSenderId: "887454729221",
  appId: "1:887454729221:web:bb25603772c95f8c00886c",
  measurementId: "G-2BED4JNPHH",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);

export { app, analytics }; // Export the initialized Firebase app and analytics object if needed elsewhere
