"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./header.css";
import "../../../globals.css";
import { SignOutUser, addStatusToUser, readUserData } from "@/firebaseDatabase";
import { getAuth } from "firebase/auth";
import { User } from "../../interfaces/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMenu from "../../accessoires/DropdownMenu/DropdownMenu";

const Header = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userData = await readUserData(user.uid);
        setUserData(userData);
        addStatusToUser(user.uid, "En ligne"); // Utilisateur connecté, mettez le statut en ligne
      } else {
        // Utilisateur déconnecté, mettez le statut hors ligne
        if (userData && userData.id) {
          addStatusToUser(userData.id, "hors ligne");
        }
        setUser(null);
        setUserData(null);
      }
      console.log(`users data from contacts:`, JSON.stringify(userData));
    });
    return () => unsubscribe();
  }, [user]); // userData devrait être inclus dans les dépendances pour que la fonction soit rappelée lorsque userData change

  const handleSignOut = async () => {
    addStatusToUser(userData.id, "hors ligne");
    await SignOutUser();
    setUser(null);
    setUserData(null);
  };
  return (
    <header className="header">
      <div className="container header_container">
        <div className="header_content content">
          <div className="logo-block">
            <Link href="/" className="logo">
              Instant-Chat
            </Link>
          </div>
          <nav className="nav">
            <div className="nav_container">
              <div className="nav_content">
                {user?.uid && (
                  <div className="links">
                    <Link href={"/dashboard"}>dashboard</Link>
                    <div className="logout" onClick={handleSignOut}>
                      déconnexion
                    </div>
                  </div>
                )}
                {!user?.uid && (
                  <div className="links">
                    <Link href="/register">s'inscrire</Link>
                    <Link href="/login">se connecter</Link>
                  </div>
                )}

                <div className="user">
                  <div className="acount"></div>
                  {userData && <div>{userData.username}</div>}
                </div>
              </div>
            </div>
          </nav>
          <nav className="nav_menu_drop">
            <DropdownMenu user={user} handleSignOut={handleSignOut} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
