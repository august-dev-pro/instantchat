import React from "react";
import LoginForm from "../ui/forms/login-form";

const page = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
