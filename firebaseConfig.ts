// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { Analytics, getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBigX6X3AB9xj8nUdZaMM-_sGQorlJQu6k",

  authDomain: "next-chat-app-project.firebaseapp.com",

  databaseURL: "https://next-chat-app-project-default-rtdb.firebaseio.com",

  projectId: "next-chat-app-project",

  storageBucket: "next-chat-app-project.appspot.com",

  messagingSenderId: "655497317696",

  appId: "1:655497317696:web:1d16c078ad191d6c053ea5",

  measurementId: "G-8X5ESTTCKE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth(app);
const storage = getStorage(app);
export { app, database, auth, storage };
