import React from "react";
import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("menu");
  return (
    <div className="navbar">
      <img src="/src/assets/frontend_assets/logo.png" alt="Logo" className="logo" />

      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home" ? 'active' : ''}>Home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu==="menu" ? 'active' : ''}>Menu</a>
        <a href="#appdownload" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app" ? 'active' : ''}>Mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact")} className={menu==="contact" ? 'active' : ''}>Contact</a>
      </ul>

      <div className="navbar-right">
        <img src="/src/assets/frontend_assets/search_icon.png" alt="Search" className="navbar-search-icon" />
        <div className="navbar-basket-icon">
          <img src="/src/assets/frontend_assets/basket_icon.png" alt="Basket"  />
          <div className="dot"></div>
        </div>
      
        <button className="login-button">Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
