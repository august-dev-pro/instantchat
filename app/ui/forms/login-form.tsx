"use client";
import React from "react";
import "./formStyle.css";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";

const LoginForm = () => {
  //oconst initialState = { message: undefined, errors: {} };
  /*   const [errorMessage, dispatch] = useFormState(authenticate, undefined);
   */
  return (
    <form /* action={dispatch} */ className="login-form form">
      <div className="log-form_container form_container">
        <div className="log-form_content form_content">
          <div className="form_header">
            <div className="reg-form_tilte form_title">Connectez-vous !!</div>
          </div>
          <div className="log-form_items form_items">
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {/*  {errorMessage && (
                <>
                  <p className="message">{errorMessage}</p>
                </>
              )} */}
            </div>
            <div className="saisies">
              <div className="chield">
                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="chield">
                <label htmlFor="email">password</label>
                <input type="password" id="password" name="password" required />
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
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
