import Link from "next/link";
import "./sideNav.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faAddressBook,
  faUser,
  faCog,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const SideNav = () => {
  const [activeLink, setActiveLink] = useState("discuss"); // "home" est activé par défaut

  const links = [
    {
      name: "discuss",
      href: "/dashboard/discuss",
      icon: faComment,
    },
    { name: "contacts", href: "/dashboard/contacts", icon: faAddressBook },
  ];
  const callActionLinks = [
    { name: "settings", href: "/dashboard/settings", icon: faCog },
    { name: "acount", href: "/dashboard/acount", icon: faUser },
    { name: "home", href: "/", icon: faHome },
  ];

  const handleLinkClick = (name: any) => {
    setActiveLink(name);
  };

  return (
    <div className="dashboard_aside">
      <div className="dashboard_aside_container">
        <div className="dashboard_aside_content">
          <div className="side_actions">
            {links.map((link) => {
              return (
                <Link href={link.href} key={link.name}>
                  <div
                    className={`${link.name} chield ${
                      activeLink === link.name ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(link.name)}
                  >
                    <div className="chield_content">
                      <div className="label">{link.name}</div>
                      <div className="icon">
                        <FontAwesomeIcon icon={link.icon} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="side_call_actions">
            {callActionLinks.map((link) => {
              return (
                <Link href={link.href} key={link.name}>
                  <div
                    className={`${link.name} chield ${
                      activeLink === link.name ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(link.name)}
                  >
                    <div className="chield_content">
                      <div className="label">{link.name}</div>
                      <div className="icon">
                        <FontAwesomeIcon icon={link.icon} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
