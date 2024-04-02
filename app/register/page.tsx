"use client";
import { userIsAuth } from "@/firebaseDatabase";
import "../globals.css";
import RegisterForm from "../ui/forms/register-form";
export default function register() {
  userIsAuth();
  return (
    <div className="">
      <RegisterForm />
    </div>
  );
}
