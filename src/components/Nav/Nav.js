import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import MenuIcon from "../../assets/hamburger.svg";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "About", link: "/about" },
    { id: 3, label: "Menu", link: "/menu" },
    { id: 4, label: "Reservations", link: "/reservations" },
    { id: 5, label: "Order Online", link: "/order-online" },
    { id: 6, label: "Login", link: "/login" }
  ];

  return (
    <div className="nav-container">
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
            <ul className={`menu-list ${isMenuOpen ? "open" : ""}`}>
            {menuItems.map(item => (
                <li key={item.id}>
                  <Link className="menu-link" to={item.link}>{item.label}</Link>
                </li>
            ))}
            </ul>
        </nav>
        <div className="menu-toggle" onClick={toggleMenu}>
            <img src={MenuIcon} alt="menu-icon" />
        </div>
    </div>
  );
};

export default Nav;