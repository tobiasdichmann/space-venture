import React, { useContext, useState } from "react";
import "../../styles/layout/adminnavbar.scss";
import { NavLink } from "react-router-dom";

import { LoginContext } from "../../../context/LoginContext";

const Navbar = () => {
  const { user, signOut } = useContext(LoginContext);

  // State - Has the burger been clicked? (true/false)
  const [showBurgermenu, setShowBurgermenu] = useState(false);

  return (
    <nav className="navbar-admin">
      {/* BURGERMENU */}
      <div className={showBurgermenu ? 'toggle-btn change' : 'toggle-btn'} onClick={() => setShowBurgermenu(!showBurgermenu)}>
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
      </div>

      {/* NAV - LINKS */}
      <div className={showBurgermenu ? 'navbar-links-admin active' : 'navbar-links-admin'}>
        <ul onClick={() => setShowBurgermenu(!showBurgermenu)}>
          <li>
            <NavLink to="/admin" end>Admin</NavLink>
          </li>
          <li>
            <NavLink to="spaceship">Rumfærgen</NavLink>
          </li>
          <li>
            <NavLink to="tours">Ture</NavLink>
          </li>
          <li>
            <NavLink to="about">Om os</NavLink>
          </li>
          <li>
            <NavLink to="team">Team</NavLink>
          </li>
          <li>
            <NavLink to="gallery">Galleri</NavLink>
          </li>
          <li>
            <NavLink to="contact">Kontakt</NavLink>
          </li>
          <li>
            <NavLink to="newslettersubscriptions">Newsletter Subscriptions</NavLink>
          </li>
          <li>
            <NavLink to="/" end>Forside</NavLink>
          </li>
          <li className="welcome-txt">
            Velkommen {user}! &nbsp;
            <button onClick={signOut}>Logud</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
