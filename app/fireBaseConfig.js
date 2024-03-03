import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwOjM67NuWLGsc8EM22tADjDfTaNoT1sk",
  authDomain: "instantchat-57a37.firebaseapp.com",
  databaseURL: "https://instantchat-57a37-default-rtdb.firebaseio.com",
  projectId: "instantchat-57a37",
  storageBucket: "instantchat-57a37.appspot.com",
  messagingSenderId: "992511153414",
  appId: "1:992511153414:web:796a65d47840a3aead3a87",
  measurementId: "G-B8EQR10K04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
