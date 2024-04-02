import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container container">
        <div className="footer_content content">
          <div className="field">
            <div className="icon">
              <FontAwesomeIcon icon={faCopy} />
            </div>
            <div className="label">augustin selete</div>
            <div className="contact">+225 057 477 588 9</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
