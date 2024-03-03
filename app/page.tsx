"use client";
import Link from "next/link";
import "./page.css";
import React, { useState } from "react";

export default function Home() {
  //const [name, setName] = useState("")
  const name = "augustin";
  const email = "augustin@gmail.com";
  const message = "lorem lorem lortzem lorem";
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
