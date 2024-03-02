"use client";
import "../globals.css";
import RegisterForm from "../ui/forms/register-form";
export default function register() {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <RegisterForm />
      </div>
    </div>
  );
}
