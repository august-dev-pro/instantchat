// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4IULqb9RezlIYvo7_NetmgAVTjism41s",
  authDomain: "chat-app-project-fffa7.firebaseapp.com",
  projectId: "chat-app-project-fffa7",
  storageBucket: "chat-app-project-fffa7.appspot.com",
  messagingSenderId: "6903424080",
  appId: "1:6903424080:web:c202e8c7d06679022e9d55",
  measurementId: "G-Z3JT33QC8K",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);

export { app, analytics };
