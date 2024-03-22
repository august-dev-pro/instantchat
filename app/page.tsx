"use client";
import Link from "next/link";
import "./page.css";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getUserDiscuss,
  listenForDiscussions,
  listenForUserData,
} from "@/firebaseDatabase";

export default function Home() {
  /*   const usersCon = getUserContactsTest("C9mRJHaYRwRcCoQAk3EKdu3U1By2");
  usersCon
    .then((users) => {
      // Assurez-vous que users est un tableau d'utilisateurs avant d'essayer d'y accéder
      if (Array.isArray(users) && users.length > 0) {
        // Accédez au premier utilisateur et affichez-le
        console.log(users[0]);
      } else {
        console.log(
          "Aucun utilisateur trouvé ou erreur lors de la récupération."
        );
      }
    })
    .catch((error) => {
      console.log("Erreur lors de la récupération des contacts :", error);
    }); */

  const [userData, setUserData] = useState<any[]>([]);
  useEffect(() => {
    const currentUser = getAuth().currentUser;
    console.log(currentUser?.uid);
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        const userId = currentUser.uid;
      }
    };
    fetchUserData();
    //  listenForUserData(setUserData, currentUser?.uid);
  }, []);

  //console.log(`users data: ${JSON.stringify(userData)}`);
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
            {/* <div className="titlte">
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
            <div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
