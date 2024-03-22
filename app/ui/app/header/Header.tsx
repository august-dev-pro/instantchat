"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./header.css";
import "../../../globals.css";
import {
  SignOutUser,
  getUserContacts,
  getUserDiscuss,
  getUsers,
  readUserData,
} from "@/firebaseDatabase";
import { getAuth } from "firebase/auth";
import { User } from "../../interfaces/interface";

const Header = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [contact, setcontact] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userData = await readUserData(user.uid);
        setUserData(userData);
        // const userContact = await getUserContacts(user.uid);
        // setcontact(userContact);
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  //console.log(`users data from contacts: ${contact}`);

  const handleSignOut = async () => {
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
        </div>
      </div>
    </header>
  );
};

export default Header;
