"use client";
import React from "react";
import "../.../../globals.css";
import "./dashboardLayout.css";
import SideNav from "../ui/dashboard/sideNav/SideNav";
import { useRequireAuth } from "@/firebaseDatabase";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useRequireAuth();
  const isChieldSelected = null;
  return (
    <div className="black dashboard">
      <div className="dashboard_container ">
        <div className="dashboard_content content">
          <SideNav isChieldSelected={isChieldSelected} />
          <div className="show">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
