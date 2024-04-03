"use client";
import React, { useState } from "react";
import "./formStyle.css";
import Link from "next/link";
import { SignOutUser, signInUser } from "@/firebaseDatabase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const errorMessage = await signInUser(email, password);

    if (errorMessage) {
      console.log("message error", errorMessage);

      switch (errorMessage) {
        case "Firebase: Error (auth/invalid-credential).":
        case "auth/invalid-email":
          seterrorMessage("Email ou mot de passe incorrect.");
          break;
        case "Firebase: Error (auth/network-request-failed).":
          seterrorMessage("verifez votre connexion internet");
          break;
        default:
          seterrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } else {
      // Redirection vers la page de tableau de bord si la connexion est réussie
      setEmail("");
      setPassword("");
      window.location.assign("/dashboard");
    }

    const handleSubmit = (event: any) => {
      event.preventDefault();
      console.log("is sabmit singin");

      signInUser(email, password);
      setEmail("");
      setPassword("");
    };
  };

  return (
    <form onSubmit={handleSubmit} className="login-form form">
      <div className="log-form_container form_container">
        <div className="log-form_content form_content">
          <div className="form_header">
            <div className="reg-form_tilte form_title">Connectez-vous !!</div>
          </div>
          <div className="log-form_items form_items">
            {errorMessage && (
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage}
              </div>
            )}

            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            ></div>

            <div className="saisies">
              <div className="chield">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="chield">
                <label htmlFor="email">password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="form_btn">
              <button className="register" type="submit">
                se connecter
              </button>
              <div className="n">
                <div className="inner">vous navez pas un compte ?</div>
                <Link href="/register" className="login" type="submit">
                  Inscrivez-vous
                </Link>
              </div>

              <div
                className="n"
                onClick={() => {
                  SignOutUser();
                }}
              >
                deconexion
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
