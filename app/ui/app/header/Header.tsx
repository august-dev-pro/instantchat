"use client";
import Link from "next/link";
import React from "react";
import "./header.css";
import "../../../globals.css";
const Header = () => {
  return (
    <header className="header">
      <div className="container header_container">
        <div className="header_content content">
          <div className="logo-block">
            <Link href="/" className="logo">
              Instant-Chat
            </Link>
          </div>
          <nav className="nav">
            <div className="nav_container">
              <div className="nav_content">
                <div className="links">
                  <Link href={"/dashboard"}>dashboard</Link>
                  <Link href="/register">sInscrire</Link>
                  <Link href="/login">se connecter</Link>
                </div>
                <div className="acount"></div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
