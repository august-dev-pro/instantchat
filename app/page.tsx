"use client";
import Link from "next/link";
import "./page.css";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { listenForUserData } from "@/firebaseDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "./ui/accessoires/filesUpload/FileUpload";

export default function Home() {
  const [userData, setUserData] = useState<any[]>([]);
  const [user, setUser] = useState<any>();

  const onFileUpload = (url: string) => {
    console.log("file Uploaded Url is: ", url);
  };
  useEffect(() => {
    const currentUser = getAuth().currentUser;
    setUser(currentUser);
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        const userId = currentUser.uid;
      }
    };
    fetchUserData();
    listenForUserData(setUserData, currentUser?.uid);
  }, []);

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
            {!user ? (
              <div className="calls-actions">
                <Link className="dash-btn" href={"/register"}>
                  sInscrire
                </Link>

                <Link className="dash-btn" href={"/login"}>
                  se Connecter
                </Link>
              </div>
            ) : (
              <div className="welcome">
                <div className="text">
                  allez a votre
                  <Link className="a" href={"/dashboard"}>
                    dashboard
                  </Link>
                  pour discuter...
                </div>
                <Link href={"/dashboard/discuss"} className="dash-btn">
                  dashboard <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            )}
          </div>
          <div className="uploadFileTest">
            <FileUpload onFileUpload={onFileUpload} />
          </div>
        </div>
      </div>
    </div>
  );
}
