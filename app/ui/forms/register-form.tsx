/* "use client"; */
import React /* { useState } */ from "react";
import "./formStyle.css";
import Link from "next/link";
/* import { useFormState } from "react-dom";
import { registerUser } from "@/app/lib/actions"; */

const RegisterForm = () => {
  /* const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(registerUser, initialState); */
  return (
    <form /* action={dispatch} */ className="register-form form">
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
                <input required type="text" name="userName" id="userName" />
              </div>

              <div className="chield">
                <label htmlFor="email">
                  email <span>*</span>
                </label>
                <input required type="email" name="email" id="email" />
              </div>

              <div className="chield">
                <label htmlFor="password">
                  mot de passe <span>*</span>
                </label>
                <input required type="password" name="password" id="password" />
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
