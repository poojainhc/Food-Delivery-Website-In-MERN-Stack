import React, { useState, useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";

const Navbar = ({ setshowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setMobileMenuOpen(false);
    navigate("/");
  };

  const handleLinkClick = (newMenu) => {
    setMenu(newMenu);
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="logo" />
      </Link>

      <div className="navbar-desktop">
        <ul className="navbar-menu">
          <Link to="/" onClick={() => handleLinkClick("home")} className={menu === "home" ? "active" : ""}>
            Home
          </Link>
          <a href="#explore-menu" onClick={() => handleLinkClick("menu")} className={menu === "menu" ? "active" : ""}>
            Menu
          </a>
          <a href="#appdownload" onClick={() => handleLinkClick("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>
            Mobile-app
          </a>
          <a href="#footer" onClick={() => handleLinkClick("contact")} className={menu === "contact" ? "active" : ""}>
            Contact
          </a>
        </ul>
      </div>

      <button className="navbar-mobile-toggle" type="button" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Toggle navigation menu">
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => handleLinkClick("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a href="#explore-menu" onClick={() => handleLinkClick("menu")} className={menu === "menu" ? "active" : ""}>
          Menu
        </a>
        <a href="#appdownload" onClick={() => handleLinkClick("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>
          Mobile-app
        </a>
        <a href="#footer" onClick={() => handleLinkClick("contact")} className={menu === "contact" ? "active" : ""}>
          Contact
        </a>
      </div>

      <div className="navbar-right">
        <img src="/search_icon.png" alt="Search" className="navbar-search-icon" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src="/basket_icon.png" alt="Basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setshowLogin(true)} className="login-button">
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate('/myOrders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="" />
                <p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
