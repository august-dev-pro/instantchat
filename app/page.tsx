"use client";
import Link from "next/link";
import "./page.css";
import { db } from "./fireBaseConfig";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
async function addData(name: string, email: string, message: string) {
  try {
    const docRef = await addDoc(collection(db, "message"), {
      name: name,
      email: email,
      message: message,
    });
    console.log(`document writen with id ${docRef.id}`);
    return true;
  } catch (error) {
    console.log(`error for trying: ${error}`);
    return false;
  }
}
export default function Home() {
  //const [name, setName] = useState("")
  const name = "augustin";
  const email = "augustin@gmail.com";
  const message = "lorem lorem lortzem lorem";

  async function handlesubmit() {
    console.log("handle submit clicked");

    const add = await addData(name, email, message);
    if (add) {
      console.log(
        `added success for the store with: ${name}, ${email}, ${message}`
      );
    } else {
      console.log(`added failled try again or see the console erreo`);
    }
  }
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
              <button onClick={() => handlesubmit()} className="action">
                run code teste
              </button>
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
