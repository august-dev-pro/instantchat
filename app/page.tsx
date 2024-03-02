import Link from "next/link";
import "./page.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export default function Home() {
  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {
    apiKey: "AIzaSyBwOjM67NuWLGsc8EM22tADjDfTaNoT1sk",
    authDomain: "instantchat-57a37.firebaseapp.com",
    projectId: "instantchat-57a37",
    storageBucket: "instantchat-57a37.appspot.com",
    messagingSenderId: "992511153414",
    appId: "1:992511153414:web:9e7dd0a66b6e9dd5ad3a87",
    measurementId: "G-JW11WCK21R",
  };

  // Initialisez Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <div className="home">
      <div className="home_container container">
        <div className="home_content content">
          <div className="home_items">
            <div className="titlte">
              <div className="text">
                bienvenue sur <span> InstantChat </span>
              </div>
            </div>
            <div className="calls-actions">
              <Link href={"/register"}>
                <button className="action">sInscrire</button>
              </Link>
              <Link href={"/login"}>
                <button className="action">se Connecter</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
