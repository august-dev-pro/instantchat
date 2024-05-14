import "./style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faChartBar,
  faCog,
  faComment,
  faUser,
  faTimes,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const DropdownMenu = ({ user }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={toggleMenu}>
        {isOpen ? ( // Vérifier si le menu est ouvert
          <FontAwesomeIcon icon={faTimes} /> // Afficher l'icône de fermeture
        ) : (
          <FontAwesomeIcon icon={faEllipsisV} /> // Sinon, afficher l'icône des trois points verticaux
        )}{" "}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {user && user.uid ? (
            <div className="content">
              <Link href={"/dashboard/discuss"} className="chield">
                <FontAwesomeIcon icon={faComment} /> discuss
              </Link>
              <Link href={"/dashboard/contacts"} className="chield">
                <FontAwesomeIcon icon={faUsers} /> contacts
              </Link>
              <Link href={"/dashboard"} className="chield">
                <FontAwesomeIcon icon={faChartBar} /> dashboard
              </Link>

              <Link href={""} className="chield">
                <FontAwesomeIcon icon={faUser} /> account
              </Link>
              <Link href={""} className="chield">
                <FontAwesomeIcon icon={faCog} /> setting
              </Link>
              <Link href={""} className="chield">
                <FontAwesomeIcon icon={faSignOutAlt} /> deconnexion
              </Link>
            </div>
          ) : (
            <div className="content">
              <div className="chield">
                <FontAwesomeIcon icon={faComment} /> s'incrire
              </div>
              <div className="chield">
                <FontAwesomeIcon icon={faComment} /> se connecter
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
