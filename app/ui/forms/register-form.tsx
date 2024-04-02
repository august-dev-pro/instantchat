"use client";
import React, { useState } from "react";
import "./formStyle.css";
import Link from "next/link";
import { writeUserData } from "@/firebaseDatabase";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event: any) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

    // Appel de la fonction writeUserData avec les informations du formulaire
    writeUserData(userName, email, phone, password);

    // Effacer les champs du formulaire après la soumission
    setUserName("");
    setEmail("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmit} className="register-form form">
      <div className="reg-form_container form_container">
        <div className="reg-form_content form_content">
          <div className="form_header">
            <div className="reg-form_tilte form_title">Inscrivez-vous !!</div>
          </div>
          <div className="reg-form_items form_items">
            <div className="saisies">
              <div className="chield">
                <label htmlFor="userName">
                  Nom dUtilisateur <span>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="userName"
                  id="userName"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>

              <div className="chield">
                <label htmlFor="email">
                  email <span>*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="chield">
                <label htmlFor="phone">
                  Numero de telephone <span>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="chield">
                <label htmlFor="password">
                  mot de passe <span>*</span>
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="form_btn">
              <button className="register" type="submit">
                sinscrire
              </button>
              <div className="n">
                <div className="inner">vous avez deja un compte ?</div>
                <Link href="/login" className="login" type="submit">
                  Connectez-vous
                </Link>
              </div>
            </div>
            <div className="message">{/* {state.errorMessage} */}</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
